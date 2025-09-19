/**
 * Collaboration Engine Tests
 * Tests for session management, operation processing, and presence
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { BrepFlowCollaborationEngine } from '../collaboration-engine';
import type {
  CollaborationConfig,
  SessionId,
  UserId,
  CollaborationUser,
  CreateNodeOperation,
  CursorPosition,
  SelectionState,
} from '../types';

// Mock WebSocket client
const mockWebSocketClient = {
  connect: vi.fn(),
  disconnect: vi.fn(),
  sendOperation: vi.fn(),
  sendCursorUpdate: vi.fn(),
  sendSelectionUpdate: vi.fn(),
  requestSync: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};

vi.mock('../websocket-client', () => ({
  CollaborationWebSocketClient: vi.fn(() => mockWebSocketClient),
}));

describe('BrepFlowCollaborationEngine', () => {
  let engine: BrepFlowCollaborationEngine;
  let config: CollaborationConfig;

  beforeEach(() => {
    config = {
      websocket: {
        url: 'ws://localhost:3001/test',
        reconnectAttempts: 3,
        reconnectDelay: 1000,
        heartbeatInterval: 30000,
        connectionTimeout: 5000,
      },
      operationalTransform: {
        maxOperationHistory: 100,
        conflictResolutionStrategy: 'merge',
        batchOperations: true,
        batchDelay: 50,
      },
      presence: {
        cursorUpdateThrottle: 50,
        selectionUpdateThrottle: 100,
        presenceTimeout: 30000,
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
        maxConcurrentUsers: 10,
        operationQueueSize: 100,
        compressionEnabled: true,
        deltaCompressionEnabled: true,
      },
    };

    engine = new BrepFlowCollaborationEngine(config);

    // Reset mocks
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe('Session Management', () => {
    it('should create a new session', async () => {
      const userId = 'user1' as UserId;
      const projectId = 'project1';

      const sessionId = await engine.createSession(projectId, userId);

      expect(sessionId).toBeTruthy();
      expect(sessionId).toMatch(/^session_/);

      const session = await engine.getSession(sessionId);
      expect(session).toBeTruthy();
      expect(session?.projectId).toBe(projectId);
      expect(session?.users.size).toBe(0); // User hasn't joined yet
    });

    it('should allow users to join a session', async () => {
      const userId = 'user1' as UserId;
      const user: CollaborationUser = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        color: '#ff0000',
        avatar: 'https://example.com/avatar.jpg',
        isOnline: false,
        lastSeen: Date.now(),
      };

      const sessionId = await engine.createSession('project1', userId);
      await engine.joinSession(sessionId, user);

      const session = await engine.getSession(sessionId);
      expect(session?.users.size).toBe(1);
      expect(session?.users.get(userId)).toEqual(expect.objectContaining({
        ...user,
        isOnline: true,
      }));

      expect(mockWebSocketClient.connect).toHaveBeenCalledWith(sessionId, userId);
    });

    it('should allow users to leave a session', async () => {
      const userId = 'user1' as UserId;
      const user: CollaborationUser = {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        color: '#ff0000',
        isOnline: false,
        lastSeen: Date.now(),
      };

      const sessionId = await engine.createSession('project1', userId);
      await engine.joinSession(sessionId, user);
      await engine.leaveSession(sessionId, userId);

      const session = await engine.getSession(sessionId);
      expect(session).toBeNull(); // Session should be deleted when empty
      expect(mockWebSocketClient.disconnect).toHaveBeenCalled();
    });

    it('should handle multiple users in a session', async () => {
      const user1: CollaborationUser = {
        id: 'user1' as UserId,
        name: 'User 1',
        email: 'user1@example.com',
        color: '#ff0000',
        isOnline: false,
        lastSeen: Date.now(),
      };

      const user2: CollaborationUser = {
        id: 'user2' as UserId,
        name: 'User 2',
        email: 'user2@example.com',
        color: '#00ff00',
        isOnline: false,
        lastSeen: Date.now(),
      };

      const sessionId = await engine.createSession('project1', user1.id);
      await engine.joinSession(sessionId, user1);
      await engine.joinSession(sessionId, user2);

      const session = await engine.getSession(sessionId);
      expect(session?.users.size).toBe(2);
      expect(session?.users.get(user1.id)).toBeTruthy();
      expect(session?.users.get(user2.id)).toBeTruthy();
    });
  });

  describe('Operation Management', () => {
    let sessionId: SessionId;
    let userId: UserId;

    beforeEach(async () => {
      userId = 'user1' as UserId;
      sessionId = await engine.createSession('project1', userId);
      await engine.joinSession(sessionId, {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        color: '#ff0000',
        isOnline: false,
        lastSeen: Date.now(),
      });
    });

    it('should apply operations to session state', async () => {
      const operation: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId,
        timestamp: Date.now(),
        version: 0,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: { a: 5, b: 3 },
      };

      await engine.applyOperation(sessionId, operation);

      const session = await engine.getSession(sessionId);
      expect(session?.state.nodes.size).toBe(1);
      expect(session?.state.nodes.get('node1')).toEqual({
        id: 'node1',
        type: 'Math::Add',
        position: { x: 100, y: 100 },
        params: { a: 5, b: 3 },
      });
      expect(session?.state.version).toBe(1);
    });

    it('should broadcast operations via WebSocket', async () => {
      const operation: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId,
        timestamp: Date.now(),
        version: 0,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: {},
      };

      await engine.applyOperation(sessionId, operation);

      expect(mockWebSocketClient.sendOperation).toHaveBeenCalledWith(
        expect.objectContaining({
          ...operation,
          version: 0, // Should be assigned during processing
        })
      );
    });

    it('should handle operation conflicts', async () => {
      // Apply first operation
      const op1: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId: 'user1' as UserId,
        timestamp: 1000,
        version: 0,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: {},
      };

      await engine.applyOperation(sessionId, op1);

      // Apply conflicting operation
      const op2: CreateNodeOperation = {
        id: 'op2',
        type: 'CREATE_NODE',
        userId: 'user2' as UserId,
        timestamp: 1001,
        version: 0,
        nodeId: 'node1', // Same node ID
        nodeType: 'Math::Multiply',
        position: { x: 200, y: 100 },
        params: {},
      };

      await engine.applyOperation(sessionId, op2);

      const session = await engine.getSession(sessionId);
      expect(session?.state.nodes.size).toBe(2); // Both nodes should exist with different IDs
    });
  });

  describe('Presence Management', () => {
    let sessionId: SessionId;
    let userId: UserId;

    beforeEach(async () => {
      userId = 'user1' as UserId;
      sessionId = await engine.createSession('project1', userId);
      await engine.joinSession(sessionId, {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        color: '#ff0000',
        isOnline: false,
        lastSeen: Date.now(),
      });
    });

    it('should broadcast cursor updates', async () => {
      const cursor: CursorPosition = {
        x: 150,
        y: 200,
        timestamp: Date.now(),
      };

      await engine.broadcastCursor(sessionId, userId, cursor);

      expect(mockWebSocketClient.sendCursorUpdate).toHaveBeenCalledWith(cursor);

      const session = await engine.getSession(sessionId);
      const user = session?.users.get(userId);
      expect(user?.cursor).toEqual(cursor);
    });

    it('should broadcast selection updates', async () => {
      const selection: SelectionState = {
        selectedNodes: ['node1', 'node2'],
        selectedEdges: ['edge1'],
        timestamp: Date.now(),
      };

      await engine.broadcastSelection(sessionId, userId, selection);

      expect(mockWebSocketClient.sendSelectionUpdate).toHaveBeenCalledWith(selection);

      const session = await engine.getSession(sessionId);
      const user = session?.users.get(userId);
      expect(user?.selection).toEqual(selection);
    });

    it('should update user presence', async () => {
      const updates = {
        name: 'Updated Name',
        color: '#00ff00',
      };

      await engine.updatePresence(sessionId, userId, updates);

      const session = await engine.getSession(sessionId);
      const user = session?.users.get(userId);
      expect(user?.name).toBe('Updated Name');
      expect(user?.color).toBe('#00ff00');
    });

    it('should get presence state', async () => {
      const cursor: CursorPosition = {
        x: 150,
        y: 200,
        timestamp: Date.now(),
      };

      const selection: SelectionState = {
        selectedNodes: ['node1'],
        selectedEdges: [],
        timestamp: Date.now(),
      };

      await engine.broadcastCursor(sessionId, userId, cursor);
      await engine.broadcastSelection(sessionId, userId, selection);

      const presence = await engine.getPresence(sessionId);

      expect(presence.users.size).toBe(1);
      expect(presence.cursors.get(userId)).toEqual(cursor);
      expect(presence.selections.get(userId)).toEqual(selection);
    });
  });

  describe('Event Management', () => {
    it('should add and remove event listeners', () => {
      const listener = vi.fn();

      engine.addEventListener('user-joined', listener);
      engine.addEventListener('user-joined', listener); // Add same listener twice

      const listeners = (engine as any).eventListeners.get('user-joined');
      expect(listeners).toHaveLength(2);

      engine.removeEventListener('user-joined', listener);
      expect(listeners).toHaveLength(1);

      engine.removeEventListener('user-joined', listener);
      expect(listeners).toHaveLength(0);
    });

    it('should emit events to listeners', async () => {
      const listener = vi.fn();
      engine.addEventListener('user-joined', listener);

      const userId = 'user1' as UserId;
      const sessionId = await engine.createSession('project1', userId);
      await engine.joinSession(sessionId, {
        id: userId,
        name: 'Test User',
        email: 'test@example.com',
        color: '#ff0000',
        isOnline: false,
        lastSeen: Date.now(),
      });

      expect(listener).toHaveBeenCalledWith(
        expect.objectContaining({
          type: 'user-joined',
          sessionId,
          userId,
        })
      );
    });
  });

  describe('Lock Manager', () => {
    it('should acquire and release locks', async () => {
      const lockManager = engine.lockManager;
      const nodeId = 'node1';
      const userId = 'user1' as UserId;

      const lock = await lockManager.acquireLock({
        nodeId,
        userId,
        lockType: 'exclusive',
        duration: 30000,
      });

      expect(lock).toBeTruthy();
      expect(lock?.nodeId).toBe(nodeId);
      expect(lock?.userId).toBe(userId);

      const isLocked = lockManager.isLocked(nodeId, 'user2' as UserId);
      expect(isLocked).toBe(true);

      const released = await lockManager.releaseLock(nodeId, userId);
      expect(released).toBe(true);

      const isLockedAfter = lockManager.isLocked(nodeId, 'user2' as UserId);
      expect(isLockedAfter).toBe(false);
    });

    it('should handle lock conflicts', async () => {
      const lockManager = engine.lockManager;
      const nodeId = 'node1';
      const user1 = 'user1' as UserId;
      const user2 = 'user2' as UserId;

      // User 1 acquires exclusive lock
      const lock1 = await lockManager.acquireLock({
        nodeId,
        userId: user1,
        lockType: 'exclusive',
        duration: 30000,
      });

      expect(lock1).toBeTruthy();

      // User 2 tries to acquire lock on same node
      const lock2 = await lockManager.acquireLock({
        nodeId,
        userId: user2,
        lockType: 'exclusive',
        duration: 30000,
      });

      expect(lock2).toBeNull(); // Should fail
    });
  });
});