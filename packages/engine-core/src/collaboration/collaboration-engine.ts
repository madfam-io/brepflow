/**
 * Collaborative Editing Engine
 * Main orchestrator for real-time collaborative graph editing
 */

import {
  CollaborationEngine,
  CollaborationSession,
  CollaborationUser,
  Operation,
  OperationConflict,
  ConflictResolution,
  SessionId,
  UserId,
  GraphState,
  PresenceState,
  CursorPosition,
  SelectionState,
  NodeLock,
  LockRequest,
  LockManager,
  AwarenessUpdate,
  CollaborationConfig,
  CollaborationEvent,
  CollaborationEventListener,
  CollaborationError,
} from './types';
import { OperationalTransformEngine } from './operational-transform';
import { CollaborationWebSocketClient } from './websocket-client';
import { NodeId, EdgeId } from '@brepflow/types';

interface PendingOperation {
  operation: Operation;
  resolve: (result: any) => void;
  reject: (error: Error) => void;
  timestamp: number;
}

export class BrepFlowCollaborationEngine implements CollaborationEngine {
  private sessions = new Map<SessionId, CollaborationSession>();
  private wsClient: CollaborationWebSocketClient | null = null;
  private operationalTransform = new OperationalTransformEngine();
  private lockManager = new CollaborationLockManager();
  private eventListeners = new Map<string, CollaborationEventListener[]>();
  private pendingOperations = new Map<string, PendingOperation>();
  private operationQueue: Operation[] = [];
  private isProcessingQueue = false;
  private config: CollaborationConfig;
  private currentUserId: UserId | null = null;
  private currentSessionId: SessionId | null = null;

  constructor(config: CollaborationConfig) {
    this.config = config;
    this.lockManager = new CollaborationLockManager();
  }

  // Session Management
  async createSession(projectId: string, userId: UserId): Promise<SessionId> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as SessionId;

    const session: CollaborationSession = {
      id: sessionId,
      projectId,
      users: new Map(),
      operations: [],
      state: {
        nodes: new Map(),
        edges: new Map(),
        version: 0,
        lastModified: Date.now(),
      },
      createdAt: Date.now(),
      lastActivity: Date.now(),
    };

    this.sessions.set(sessionId, session);
    this.currentSessionId = sessionId;
    this.currentUserId = userId;

    this.emit({
      type: 'session-created',
      sessionId,
      userId,
      data: { session },
      timestamp: Date.now(),
    });

    return sessionId;
  }

  async joinSession(sessionId: SessionId, user: CollaborationUser): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    // Add user to session
    session.users.set(user.id, {
      ...user,
      isOnline: true,
      lastSeen: Date.now(),
    });

    session.lastActivity = Date.now();
    this.currentSessionId = sessionId;
    this.currentUserId = user.id;

    // Initialize WebSocket connection if not already connected
    if (!this.wsClient) {
      this.wsClient = new CollaborationWebSocketClient(this.config.websocket);
      this.setupWebSocketEventHandlers();
    }

    await this.wsClient.connect(sessionId, user.id);

    this.emit({
      type: 'user-joined',
      sessionId,
      userId: user.id,
      data: { user },
      timestamp: Date.now(),
    });
  }

  async leaveSession(sessionId: SessionId, userId: UserId): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      return; // Session doesn't exist, nothing to do
    }

    // Remove user from session
    const user = session.users.get(userId);
    if (user) {
      session.users.delete(userId);

      // Release all locks held by this user
      const userLocks = this.lockManager.getLocks().filter(lock => lock.userId === userId);
      for (const lock of userLocks) {
        await this.lockManager.releaseLock(lock.nodeId, userId);
      }

      this.emit({
        type: 'user-left',
        sessionId,
        userId,
        data: { user },
        timestamp: Date.now(),
      });
    }

    // Disconnect WebSocket if this was the current user
    if (userId === this.currentUserId) {
      this.wsClient?.disconnect();
      this.wsClient = null;
      this.currentSessionId = null;
      this.currentUserId = null;
    }

    // Clean up empty sessions
    if (session.users.size === 0) {
      this.sessions.delete(sessionId);
    }
  }

  async getSession(sessionId: SessionId): Promise<CollaborationSession | null> {
    return this.sessions.get(sessionId) || null;
  }

  // Operation Management
  async applyOperation(sessionId: SessionId, operation: Operation): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    // Add to operation queue for processing
    this.operationQueue.push(operation);

    if (!this.isProcessingQueue) {
      await this.processOperationQueue(sessionId);
    }
  }

  async transformOperation(localOp: Operation, remoteOp: Operation): Promise<Operation> {
    return this.operationalTransform.transform(localOp, remoteOp);
  }

  async resolveConflict(conflict: OperationConflict): Promise<ConflictResolution> {
    const strategy = this.config.operationalTransform.conflictResolutionStrategy;
    const resolution = await this.operationalTransform.resolveConflict(conflict, strategy);

    this.emit({
      type: 'conflict-detected',
      sessionId: this.currentSessionId!,
      data: { conflict, resolution },
      timestamp: Date.now(),
    });

    return resolution;
  }

  // Real-time Communication
  async broadcastOperation(sessionId: SessionId, operation: Operation): Promise<void> {
    if (this.wsClient) {
      await this.wsClient.sendOperation(operation);
    }

    this.emit({
      type: 'operation-applied',
      sessionId,
      data: { operation },
      timestamp: Date.now(),
    });
  }

  async broadcastCursor(
    sessionId: SessionId,
    userId: UserId,
    cursor: CursorPosition
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    // Update user's cursor in session
    const user = session.users.get(userId);
    if (user) {
      user.cursor = cursor;
      user.lastSeen = Date.now();
    }

    if (this.wsClient) {
      await this.wsClient.sendCursorUpdate(cursor);
    }

    this.emit({
      type: 'cursor-updated',
      sessionId,
      userId,
      data: cursor,
      timestamp: Date.now(),
    });
  }

  async broadcastSelection(
    sessionId: SessionId,
    userId: UserId,
    selection: SelectionState
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    // Update user's selection in session
    const user = session.users.get(userId);
    if (user) {
      user.selection = selection;
      user.lastSeen = Date.now();
    }

    if (this.wsClient) {
      await this.wsClient.sendSelectionUpdate(selection);
    }

    this.emit({
      type: 'selection-updated',
      sessionId,
      userId,
      data: selection,
      timestamp: Date.now(),
    });
  }

  // Synchronization
  async syncWithServer(sessionId: SessionId, lastKnownVersion: number): Promise<Operation[]> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    // Return operations since the last known version
    const missedOperations = session.operations.filter(
      op => op.version > lastKnownVersion
    );

    if (this.wsClient) {
      await this.wsClient.requestSync(lastKnownVersion);
    }

    return missedOperations;
  }

  async getFullState(sessionId: SessionId): Promise<GraphState> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    return { ...session.state };
  }

  // Presence Management
  async updatePresence(
    sessionId: SessionId,
    userId: UserId,
    presence: Partial<CollaborationUser>
  ): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    const user = session.users.get(userId);
    if (user) {
      Object.assign(user, presence, { lastSeen: Date.now() });
      session.lastActivity = Date.now();

      this.emit({
        type: 'user-updated',
        sessionId,
        userId,
        data: { user },
        timestamp: Date.now(),
      });
    }
  }

  async getPresence(sessionId: SessionId): Promise<PresenceState> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    const cursors = new Map<UserId, CursorPosition>();
    const selections = new Map<UserId, SelectionState>();

    // Extract cursor and selection data from users
    for (const [userId, user] of session.users) {
      if (user.cursor) {
        cursors.set(userId, user.cursor);
      }
      if (user.selection) {
        selections.set(userId, user.selection);
      }
    }

    return {
      users: new Map(session.users),
      cursors,
      selections,
      lastUpdate: session.lastActivity,
    };
  }

  // Lock Manager
  get lockManager(): LockManager {
    return this.lockManager;
  }

  // Event Management
  addEventListener(type: string, listener: CollaborationEventListener): void {
    if (!this.eventListeners.has(type)) {
      this.eventListeners.set(type, []);
    }
    this.eventListeners.get(type)!.push(listener);
  }

  removeEventListener(type: string, listener: CollaborationEventListener): void {
    const listeners = this.eventListeners.get(type);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) {
        listeners.splice(index, 1);
      }
    }
  }

  // Private Methods
  private async processOperationQueue(sessionId: SessionId): Promise<void> {
    if (this.isProcessingQueue || this.operationQueue.length === 0) {
      return;
    }

    this.isProcessingQueue = true;

    try {
      while (this.operationQueue.length > 0) {
        const operation = this.operationQueue.shift()!;
        await this.processOperation(sessionId, operation);
      }
    } finally {
      this.isProcessingQueue = false;
    }
  }

  private async processOperation(sessionId: SessionId, operation: Operation): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    try {
      // Check for conflicts with pending operations
      const conflicts = this.detectConflicts(operation, session.operations);

      if (conflicts.length > 0) {
        // Resolve conflicts
        for (const conflict of conflicts) {
          const resolution = await this.resolveConflict(conflict);
          operation = resolution.resolvedOperation;
        }
      }

      // Apply operation to session state
      await this.applyOperationToState(session, operation);

      // Add to operation history
      operation.version = session.state.version;
      session.operations.push(operation);

      // Update session state
      session.state.version++;
      session.state.lastModified = Date.now();
      session.lastActivity = Date.now();

      // Broadcast to other users
      await this.broadcastOperation(sessionId, operation);

      this.emit({
        type: 'operation-received',
        sessionId,
        data: { operation },
        timestamp: Date.now(),
      });

    } catch (error) {
      console.error('Error processing operation:', error);
      throw new CollaborationError(
        'Failed to process operation',
        'OPERATION_FAILED',
        sessionId,
        operation
      );
    }
  }

  private detectConflicts(operation: Operation, history: Operation[]): OperationConflict[] {
    const conflicts: OperationConflict[] = [];

    // Check recent operations for conflicts (last 10 operations)
    const recentOps = history.slice(-10);

    for (const recentOp of recentOps) {
      if (recentOp.userId !== operation.userId) {
        const conflict = this.operationalTransform.detectConflict(operation, recentOp);
        if (conflict) {
          conflicts.push(conflict);
        }
      }
    }

    return conflicts;
  }

  private async applyOperationToState(
    session: CollaborationSession,
    operation: Operation
  ): Promise<void> {
    const { state } = session;

    switch (operation.type) {
      case 'CREATE_NODE':
        const createNodeOp = operation as any;
        state.nodes.set(createNodeOp.nodeId, {
          id: createNodeOp.nodeId,
          type: createNodeOp.nodeType,
          position: createNodeOp.position,
          params: createNodeOp.params || {},
        });
        break;

      case 'DELETE_NODE':
        const deleteNodeOp = operation as any;
        state.nodes.delete(deleteNodeOp.nodeId);
        // Also remove edges connected to this node
        for (const [edgeId, edge] of state.edges) {
          if (edge.sourceNodeId === deleteNodeOp.nodeId || edge.targetNodeId === deleteNodeOp.nodeId) {
            state.edges.delete(edgeId);
          }
        }
        break;

      case 'UPDATE_NODE_POSITION':
        const updatePosOp = operation as any;
        const posNode = state.nodes.get(updatePosOp.nodeId);
        if (posNode) {
          posNode.position = updatePosOp.position;
        }
        break;

      case 'UPDATE_NODE_PARAMS':
        const updateParamsOp = operation as any;
        const paramsNode = state.nodes.get(updateParamsOp.nodeId);
        if (paramsNode) {
          Object.assign(paramsNode.params, updateParamsOp.paramUpdates);
        }
        break;

      case 'CREATE_EDGE':
        const createEdgeOp = operation as any;
        state.edges.set(createEdgeOp.edgeId, {
          id: createEdgeOp.edgeId,
          sourceNodeId: createEdgeOp.sourceNodeId,
          sourceSocket: createEdgeOp.sourceSocket,
          targetNodeId: createEdgeOp.targetNodeId,
          targetSocket: createEdgeOp.targetSocket,
        });
        break;

      case 'DELETE_EDGE':
        const deleteEdgeOp = operation as any;
        state.edges.delete(deleteEdgeOp.edgeId);
        break;

      case 'BATCH':
        const batchOp = operation as any;
        for (const subOp of batchOp.operations) {
          await this.applyOperationToState(session, subOp);
        }
        break;
    }
  }

  private setupWebSocketEventHandlers(): void {
    if (!this.wsClient) return;

    this.wsClient.addEventListener('operation-received', (event) => {
      if (event.sessionId === this.currentSessionId) {
        this.applyOperation(event.sessionId, event.data);
      }
    });

    this.wsClient.addEventListener('cursor-updated', (event) => {
      this.emit(event);
    });

    this.wsClient.addEventListener('selection-updated', (event) => {
      this.emit(event);
    });

    this.wsClient.addEventListener('user-joined', (event) => {
      this.emit(event);
    });

    this.wsClient.addEventListener('user-left', (event) => {
      this.emit(event);
    });

    this.wsClient.addEventListener('sync-completed', (event) => {
      this.emit(event);
    });

    this.wsClient.addEventListener('connection-status-changed', (event) => {
      this.emit(event);
    });
  }

  private emit(event: CollaborationEvent): void {
    const listeners = this.eventListeners.get(event.type);
    if (listeners) {
      listeners.forEach(listener => {
        try {
          listener(event);
        } catch (error) {
          console.error('Error in event listener:', error);
        }
      });
    }
  }
}

// Lock Manager Implementation
class CollaborationLockManager implements LockManager {
  private locks = new Map<NodeId, NodeLock>();
  private lockTimeouts = new Map<NodeId, number>();

  async acquireLock(request: LockRequest): Promise<NodeLock | null> {
    const existingLock = this.locks.get(request.nodeId);

    // Check if node is already locked
    if (existingLock) {
      if (existingLock.userId === request.userId) {
        // User already has the lock, refresh it
        return this.refreshLockInternal(existingLock);
      } else if (existingLock.lockType === 'exclusive') {
        // Cannot acquire lock on exclusively locked node
        return null;
      } else if (request.lockType === 'exclusive') {
        // Cannot acquire exclusive lock on already locked node
        return null;
      }
      // Allow multiple view locks
    }

    const now = Date.now();
    const duration = request.duration || 30000; // Default 30 seconds

    const lock: NodeLock = {
      nodeId: request.nodeId,
      userId: request.userId,
      lockType: request.lockType,
      acquiredAt: now,
      expiresAt: now + duration,
      autoRelease: true,
    };

    this.locks.set(request.nodeId, lock);

    // Set up auto-release timer
    if (lock.autoRelease) {
      const timeoutId = window.setTimeout(() => {
        this.releaseLock(request.nodeId, request.userId);
      }, duration);

      this.lockTimeouts.set(request.nodeId, timeoutId);
    }

    return lock;
  }

  async releaseLock(nodeId: NodeId, userId: UserId): Promise<boolean> {
    const lock = this.locks.get(nodeId);

    if (!lock || lock.userId !== userId) {
      return false; // Lock doesn't exist or user doesn't own it
    }

    this.locks.delete(nodeId);

    // Clear timeout
    const timeoutId = this.lockTimeouts.get(nodeId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.lockTimeouts.delete(nodeId);
    }

    return true;
  }

  getLocks(nodeId?: NodeId): NodeLock[] {
    if (nodeId) {
      const lock = this.locks.get(nodeId);
      return lock ? [lock] : [];
    }

    return Array.from(this.locks.values());
  }

  isLocked(nodeId: NodeId, userId: UserId): boolean {
    const lock = this.locks.get(nodeId);
    if (!lock) return false;

    // Check if lock has expired
    if (Date.now() > lock.expiresAt) {
      this.releaseLock(nodeId, lock.userId);
      return false;
    }

    // User can access if they own the lock or it's not exclusive
    return lock.userId === userId || lock.lockType !== 'exclusive';
  }

  async refreshLock(nodeId: NodeId, userId: UserId): Promise<boolean> {
    const lock = this.locks.get(nodeId);

    if (!lock || lock.userId !== userId) {
      return false;
    }

    this.refreshLockInternal(lock);
    return true;
  }

  private refreshLockInternal(lock: NodeLock): NodeLock {
    const now = Date.now();
    const duration = lock.expiresAt - lock.acquiredAt; // Keep same duration

    lock.expiresAt = now + duration;

    // Reset timeout
    const timeoutId = this.lockTimeouts.get(lock.nodeId);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (lock.autoRelease) {
      const newTimeoutId = window.setTimeout(() => {
        this.releaseLock(lock.nodeId, lock.userId);
      }, duration);

      this.lockTimeouts.set(lock.nodeId, newTimeoutId);
    }

    return lock;
  }
}

// Export singleton instance
export const collaborationEngine = new BrepFlowCollaborationEngine({
  websocket: {
    url: 'ws://localhost:3001/collaboration',
    reconnectAttempts: 5,
    reconnectDelay: 2000,
    heartbeatInterval: 30000,
    connectionTimeout: 10000,
  },
  operationalTransform: {
    maxOperationHistory: 1000,
    conflictResolutionStrategy: 'merge',
    batchOperations: true,
    batchDelay: 100,
  },
  presence: {
    cursorUpdateThrottle: 100,
    selectionUpdateThrottle: 200,
    presenceTimeout: 60000,
    showCursors: true,
    showSelections: true,
  },
  locks: {
    defaultLockDuration: 30000,
    maxLockDuration: 300000,
    autoReleaseLocks: true,
    lockConflictResolution: 'queue',
  },
  performance: {
    maxConcurrentUsers: 50,
    operationQueueSize: 1000,
    compressionEnabled: true,
    deltaCompressionEnabled: true,
  },
});