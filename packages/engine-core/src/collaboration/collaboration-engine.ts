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
  private _lockManager: CollaborationLockManager;
  private eventListeners = new Map<string, CollaborationEventListener[]>();
  private pendingOperations = new Map<string, PendingOperation>();
  private operationQueue: Operation[] = [];
  private isProcessingQueue = false;
  private config: CollaborationConfig;
  private currentUserId: UserId | null = null;
  private currentSessionId: SessionId | null = null;

  constructor(config: CollaborationConfig) {
    this.config = config;
    this._lockManager = new CollaborationLockManager();
  }

  // Session Management
  async createSession(projectId: string, userId: UserId): Promise<SessionId> {
    const sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}` as SessionId;

    const session: CollaborationSession = {
      id: sessionId,
      projectId,
      createdAt: Date.now(),
      lastActivity: Date.now(),
      users: new Map(),
      operations: [],
      state: {
        nodes: new Map(),
        edges: new Map(),
        version: 0,
        lastModified: Date.now(),
      },
      presence: {
        users: new Set(),
        cursors: new Map(),
        selections: new Map(),
      },
    };

    this.sessions.set(sessionId, session);

    this.emit({
      type: 'session-created',
      sessionId,
      data: { projectId, userId },
      timestamp: Date.now(),
    });

    return sessionId;
  }

  async joinSession(sessionId: SessionId, user: CollaborationUser): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    // Update user status
    user.isOnline = true;
    user.lastSeen = Date.now();

    session.users.set(user.id, user);
    session.presence.users.add(user.id);
    session.lastActivity = Date.now();

    this.currentUserId = user.id;
    this.currentSessionId = sessionId;

    this.emit({
      type: 'user-joined',
      sessionId,
      data: { user },
      timestamp: Date.now(),
    });
  }

  async leaveSession(sessionId: SessionId, userId: UserId): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    // Remove user from the session
    session.users.delete(userId);

    // Clean up presence data
    session.presence.users.delete(userId);
    session.presence.cursors.delete(userId);
    session.presence.selections.delete(userId);
    session.lastActivity = Date.now();

    // Release any locks held by this user
    const locks = this._lockManager.getLocks();
    for (const lock of locks) {
      if (lock.userId === userId) {
        await this._lockManager.releaseLock(lock.nodeId, userId);
      }
    }

    this.emit({
      type: 'user-left',
      sessionId,
      data: { userId },
      timestamp: Date.now(),
    });

    // Clear current user if they're leaving
    if (this.currentUserId === userId) {
      this.currentUserId = null;
      this.currentSessionId = null;
    }

    // Delete session if empty
    if (session.users.size === 0 || Array.from(session.users.values()).every(u => !u.isOnline)) {
      this.sessions.delete(sessionId);
      if (this.wsClient) {
        await this.wsClient.disconnect();
      }
    }
  }

  async getSession(sessionId: SessionId): Promise<CollaborationSession | null> {
    const session = this.sessions.get(sessionId);

    // Check if session should be deleted (no online users)
    if (session && Array.from(session.users.values()).every(u => !u.isOnline)) {
      this.sessions.delete(sessionId);
      return null;
    }

    return session || null;
  }

  async getSessionState(sessionId: SessionId): Promise<GraphState> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    return { ...session.state };
  }

  // Operation Management
  async processOperation(sessionId: SessionId, operation: Operation): Promise<void> {
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

  // Alias for processOperation to match interface expectations
  async applyOperation(sessionId: SessionId, operation: Operation): Promise<void> {
    return this.processOperation(sessionId, operation);
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
          paramsNode.params = { ...paramsNode.params, ...updateParamsOp.params };
        }
        break;

      case 'CREATE_EDGE':
        const createEdgeOp = operation as any;
        state.edges.set(createEdgeOp.edgeId, {
          id: createEdgeOp.edgeId,
          sourceNodeId: createEdgeOp.sourceNodeId,
          targetNodeId: createEdgeOp.targetNodeId,
          sourceSocket: createEdgeOp.sourceSocket,
          targetSocket: createEdgeOp.targetSocket,
        });
        break;

      case 'DELETE_EDGE':
        const deleteEdgeOp = operation as any;
        state.edges.delete(deleteEdgeOp.edgeId);
        break;

      default:
        throw new CollaborationError(
          `Unknown operation type: ${operation.type}`,
          'INVALID_OPERATION'
        );
    }
  }

  private async resolveConflict(conflict: OperationConflict): Promise<ConflictResolution> {
    // Simple conflict resolution - for now just prefer the newer operation
    return {
      resolved: true,
      strategy: 'prefer-newer',
      resolvedOperation: conflict.operation,
      metadata: { conflictType: conflict.type },
    };
  }

  private async broadcastOperation(sessionId: SessionId, operation: Operation): Promise<void> {
    if (this.wsClient) {
      await this.wsClient.sendOperation(sessionId, operation);
    }
  }

  // Presence Management
  async broadcastCursor(sessionId: SessionId, userId: UserId, cursor: CursorPosition): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    session.presence.cursors.set(userId, cursor);
    session.lastActivity = Date.now();

    if (this.wsClient) {
      await this.wsClient.sendCursorUpdate(sessionId, userId, cursor);
    }

    this.emit({
      type: 'cursor-updated',
      sessionId,
      data: { userId, cursor },
      timestamp: Date.now(),
    });
  }

  async broadcastSelection(sessionId: SessionId, userId: UserId, selection: SelectionState): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    session.presence.selections.set(userId, selection);
    session.lastActivity = Date.now();

    if (this.wsClient) {
      await this.wsClient.sendSelectionUpdate(sessionId, userId, selection);
    }

    this.emit({
      type: 'selection-updated',
      sessionId,
      data: { userId, selection },
      timestamp: Date.now(),
    });
  }

  async updatePresence(sessionId: SessionId, userId: UserId, awareness: AwarenessUpdate): Promise<void> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    const user = session.users.get(userId);
    if (user) {
      user.isOnline = awareness.isOnline ?? user.isOnline;
      user.lastSeen = Date.now();
    }

    session.lastActivity = Date.now();

    this.emit({
      type: 'presence-updated',
      sessionId,
      data: { userId, awareness },
      timestamp: Date.now(),
    });
  }

  async getPresence(sessionId: SessionId): Promise<PresenceState> {
    const session = this.sessions.get(sessionId);
    if (!session) {
      throw new CollaborationError('Session not found', 'SESSION_NOT_FOUND', sessionId);
    }

    return { ...session.presence };
  }

  // Lock Manager
  get lockManager(): LockManager {
    return this._lockManager;
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

  // WebSocket Management
  async connect(): Promise<void> {
    if (!this.wsClient) {
      this.wsClient = new CollaborationWebSocketClient(this.config.websocket);

      // Setup event listeners
      this.wsClient.addEventListener('operation', (data) => {
        // Handle incoming operations
        this.processOperation(data.sessionId, data.operation).catch(console.error);
      });

      this.wsClient.addEventListener('cursor-update', (data) => {
        // Update local cursor state
        this.broadcastCursor(data.sessionId, data.userId, data.cursor).catch(console.error);
      });

      this.wsClient.addEventListener('selection-update', (data) => {
        // Update local selection state
        this.broadcastSelection(data.sessionId, data.userId, data.selection).catch(console.error);
      });
    }

    await this.wsClient.connect();
  }

  async disconnect(): Promise<void> {
    if (this.wsClient) {
      await this.wsClient.disconnect();
      this.wsClient = null;
    }
  }

  // Cleanup
  async cleanup(): Promise<void> {
    await this.disconnect();
    this.sessions.clear();
    this.eventListeners.clear();
    this.pendingOperations.clear();
    this.operationQueue = [];
  }
}

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
      const timeoutId = (globalThis as any).setTimeout(() => {
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

    // Return true if the node is locked and this user doesn't own the lock
    // or if it's an exclusive lock
    if (lock.lockType === 'exclusive' && lock.userId !== userId) {
      return true;
    }

    // For view locks, it's considered locked if someone else has it
    return lock.userId !== userId;
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
    const duration = lock.expiresAt - lock.acquiredAt; // Use original duration

    lock.expiresAt = now + duration;

    // Reset timer
    const timeoutId = this.lockTimeouts.get(lock.nodeId);
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (lock.autoRelease) {
      const newTimeoutId = (globalThis as any).setTimeout(() => {
        this.releaseLock(lock.nodeId, lock.userId);
      }, duration);

      this.lockTimeouts.set(lock.nodeId, newTimeoutId);
    }

    return lock;
  }

  async forceReleaseLock(nodeId: NodeId): Promise<boolean> {
    const lock = this.locks.get(nodeId);
    if (!lock) return false;

    this.locks.delete(nodeId);

    // Clear timeout
    const timeoutId = this.lockTimeouts.get(nodeId);
    if (timeoutId) {
      clearTimeout(timeoutId);
      this.lockTimeouts.delete(nodeId);
    }

    return true;
  }

  async releaseAllLocks(userId: UserId): Promise<number> {
    let releasedCount = 0;

    for (const [nodeId, lock] of this.locks) {
      if (lock.userId === userId) {
        await this.releaseLock(nodeId, userId);
        releasedCount++;
      }
    }

    return releasedCount;
  }
}