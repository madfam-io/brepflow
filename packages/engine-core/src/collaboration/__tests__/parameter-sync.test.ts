/**
 * Parameter Synchronization Tests
 * Tests for real-time parameter sync and conflict resolution
 */

import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { ParameterSynchronizer, ParameterSyncManager } from '../parameter-sync';
import type {
  CollaborationEngine,
  ParameterChange,
  SessionId,
  UserId,
  NodeId,
} from '../types';

// Mock collaboration engine
const mockCollaborationEngine: Partial<CollaborationEngine> = {
  applyOperation: vi.fn(),
  addEventListener: vi.fn(),
  removeEventListener: vi.fn(),
};

describe('ParameterSynchronizer', () => {
  let synchronizer: ParameterSynchronizer;

  beforeEach(() => {
    synchronizer = new ParameterSynchronizer(
      mockCollaborationEngine as CollaborationEngine,
      {
        throttleDelay: 100,
        batchDelay: 50,
        conflictResolutionStrategy: 'last-writer-wins',
        enableParameterLocking: true,
        lockTimeout: 5000,
      }
    );

    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Parameter Updates', () => {
    it('should update parameters and sync across users', async () => {
      const sessionId = 'session1' as SessionId;
      const nodeId = 'node1' as NodeId;
      const userId = 'user1' as UserId;
      const paramName = 'value';
      const value = 42;

      // Mock getCurrentParameterValue to return previous value
      vi.spyOn(synchronizer as any, 'getCurrentParameterValue').mockResolvedValue(10);

      await synchronizer.updateParameter(
        sessionId,
        nodeId,
        paramName,
        value,
        userId
      );

      // Fast-forward timers to trigger throttled update
      await vi.runAllTimersAsync();

      expect(mockCollaborationEngine.applyOperation).toHaveBeenCalledWith(
        sessionId,
        expect.objectContaining({
          type: 'UPDATE_NODE_PARAMS',
          nodeId,
          paramUpdates: { [paramName]: value },
          previousValues: { [paramName]: 10 },
          userId,
        })
      );
    });

    it('should throttle parameter updates', async () => {
      const sessionId = 'session1' as SessionId;
      const nodeId = 'node1' as NodeId;
      const userId = 'user1' as UserId;

      vi.spyOn(synchronizer as any, 'getCurrentParameterValue').mockResolvedValue(0);

      // Rapid updates
      await synchronizer.updateParameter(sessionId, nodeId, 'value', 1, userId);
      await synchronizer.updateParameter(sessionId, nodeId, 'value', 2, userId);
      await synchronizer.updateParameter(sessionId, nodeId, 'value', 3, userId);

      // Should not have called applyOperation yet
      expect(mockCollaborationEngine.applyOperation).not.toHaveBeenCalled();

      // Fast-forward past throttle delay
      await vi.runAllTimersAsync();

      // Should have called only once with the latest value
      expect(mockCollaborationEngine.applyOperation).toHaveBeenCalledTimes(1);
      expect(mockCollaborationEngine.applyOperation).toHaveBeenCalledWith(
        sessionId,
        expect.objectContaining({
          paramUpdates: { value: 3 },
        })
      );
    });

    it('should handle parameter conflicts', async () => {
      const change1: ParameterChange = {
        nodeId: 'node1' as NodeId,
        paramName: 'value',
        value: 10,
        previousValue: 5,
        userId: 'user1' as UserId,
        timestamp: 1000,
      };

      const change2: ParameterChange = {
        nodeId: 'node1' as NodeId,
        paramName: 'value',
        value: 15,
        previousValue: 5,
        userId: 'user2' as UserId,
        timestamp: 1001,
      };

      // Simulate conflict resolution
      const resolvedChange = await (synchronizer as any).resolveParameterConflict(
        change1,
        change2
      );

      // Later timestamp should win with last-writer-wins strategy
      expect(resolvedChange.value).toBe(15);
      expect(resolvedChange.userId).toBe('user2');
    });
  });

  describe('Parameter Locking', () => {
    it('should acquire parameter locks', async () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const userId = 'user1' as UserId;

      const acquired = await synchronizer.lockParameter(nodeId, paramName, userId);
      expect(acquired).toBe(true);

      const isLocked = synchronizer.isParameterLocked(nodeId, paramName, 'user2' as UserId);
      expect(isLocked).toBe(true);

      // Same user should be able to access
      const isLockedForOwner = synchronizer.isParameterLocked(nodeId, paramName, userId);
      expect(isLockedForOwner).toBe(false);
    });

    it('should release parameter locks', async () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const userId = 'user1' as UserId;

      await synchronizer.lockParameter(nodeId, paramName, userId);
      const released = await synchronizer.releaseParameterLock(nodeId, paramName, userId);

      expect(released).toBe(true);

      const isLocked = synchronizer.isParameterLocked(nodeId, paramName, 'user2' as UserId);
      expect(isLocked).toBe(false);
    });

    it('should auto-release locks after timeout', async () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const userId = 'user1' as UserId;

      await synchronizer.lockParameter(nodeId, paramName, userId);

      // Fast-forward past lock timeout
      vi.advanceTimersByTime(6000);

      const isLocked = synchronizer.isParameterLocked(nodeId, paramName, 'user2' as UserId);
      expect(isLocked).toBe(false);
    });

    it('should prevent updates to locked parameters', async () => {
      const sessionId = 'session1' as SessionId;
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const user1 = 'user1' as UserId;
      const user2 = 'user2' as UserId;

      // User 1 locks the parameter
      await synchronizer.lockParameter(nodeId, paramName, user1);

      // User 2 tries to update
      await expect(
        synchronizer.updateParameter(sessionId, nodeId, paramName, 42, user2)
      ).rejects.toThrow('Parameter value is locked by another user');
    });
  });

  describe('Change Listeners', () => {
    it('should notify listeners of parameter changes', () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const listener = vi.fn();

      synchronizer.addParameterChangeListener(nodeId, paramName, listener);

      const change: ParameterChange = {
        nodeId,
        paramName,
        value: 42,
        previousValue: 10,
        userId: 'user1' as UserId,
        timestamp: Date.now(),
      };

      (synchronizer as any).notifyParameterChange(change);

      expect(listener).toHaveBeenCalledWith(change);
    });

    it('should remove listeners correctly', () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const listener = vi.fn();

      synchronizer.addParameterChangeListener(nodeId, paramName, listener);
      synchronizer.removeParameterChangeListener(nodeId, paramName, listener);

      const change: ParameterChange = {
        nodeId,
        paramName,
        value: 42,
        previousValue: 10,
        userId: 'user1' as UserId,
        timestamp: Date.now(),
      };

      (synchronizer as any).notifyParameterChange(change);

      expect(listener).not.toHaveBeenCalled();
    });
  });
});

describe('ParameterSyncManager', () => {
  let synchronizer: ParameterSynchronizer;
  let manager: ParameterSyncManager;

  beforeEach(() => {
    synchronizer = new ParameterSynchronizer(
      mockCollaborationEngine as CollaborationEngine
    );
    manager = new ParameterSyncManager(
      synchronizer,
      'session1' as SessionId,
      'user1' as UserId
    );

    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Subscription Management', () => {
    it('should subscribe to parameter changes', () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const callback = vi.fn();

      const unsubscribe = manager.subscribe(nodeId, paramName, callback);

      expect(typeof unsubscribe).toBe('function');

      // Simulate parameter change
      const change: ParameterChange = {
        nodeId,
        paramName,
        value: 42,
        previousValue: 10,
        userId: 'user2' as UserId,
        timestamp: Date.now(),
      };

      (manager as any).updateParameterState(
        (manager as any).getStateKey(nodeId, paramName),
        change
      );

      expect(callback).toHaveBeenCalledWith(
        expect.objectContaining({
          value: 42,
          lastModified: change.timestamp,
          lastModifiedBy: 'user2',
        })
      );
    });

    it('should unsubscribe correctly', () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const callback = vi.fn();

      const unsubscribe = manager.subscribe(nodeId, paramName, callback);
      unsubscribe();

      // Simulate parameter change
      const change: ParameterChange = {
        nodeId,
        paramName,
        value: 42,
        previousValue: 10,
        userId: 'user2' as UserId,
        timestamp: Date.now(),
      };

      (manager as any).updateParameterState(
        (manager as any).getStateKey(nodeId, paramName),
        change
      );

      expect(callback).not.toHaveBeenCalled();
    });
  });

  describe('Parameter Updates', () => {
    it('should update parameters with automatic locking', async () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const value = 42;

      vi.spyOn(synchronizer, 'isParameterLocked').mockReturnValue(false);
      vi.spyOn(synchronizer, 'lockParameter').mockResolvedValue(true);
      vi.spyOn(synchronizer, 'updateParameter').mockResolvedValue();
      vi.spyOn(synchronizer, 'releaseParameterLock').mockResolvedValue(true);

      await manager.updateParameter(nodeId, paramName, value, { autoLock: true });

      expect(synchronizer.lockParameter).toHaveBeenCalledWith(nodeId, paramName, 'user1');
      expect(synchronizer.updateParameter).toHaveBeenCalledWith(
        'session1',
        nodeId,
        paramName,
        value,
        'user1'
      );

      // Fast-forward to trigger lock release
      vi.advanceTimersByTime(1100);

      expect(synchronizer.releaseParameterLock).toHaveBeenCalledWith(nodeId, paramName, 'user1');
    });

    it('should handle locked parameters', async () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';
      const value = 42;

      vi.spyOn(synchronizer, 'isParameterLocked').mockReturnValue(true);

      await expect(manager.updateParameter(nodeId, paramName, value)).rejects.toThrow(
        'Parameter is locked by another user'
      );
    });
  });

  describe('State Management', () => {
    it('should get parameter state', () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';

      // Initially null
      let state = manager.getParameterState(nodeId, paramName);
      expect(state).toBeNull();

      // Subscribe to initialize state
      const callback = vi.fn();
      manager.subscribe(nodeId, paramName, callback);

      state = manager.getParameterState(nodeId, paramName);
      expect(state).toEqual({
        value: undefined,
        isLocked: false,
        lockedBy: null,
        lastModified: 0,
        lastModifiedBy: null,
      });
    });

    it('should update lock state correctly', () => {
      const nodeId = 'node1' as NodeId;
      const paramName = 'value';

      vi.spyOn(synchronizer, 'isParameterLocked').mockReturnValue(true);
      vi.spyOn(synchronizer, 'getParameterLocks').mockReturnValue([
        {
          nodeId,
          paramName,
          userId: 'user2' as UserId,
          acquiredAt: Date.now(),
          expiresAt: Date.now() + 30000,
        },
      ]);

      const callback = vi.fn();
      manager.subscribe(nodeId, paramName, callback);

      const change: ParameterChange = {
        nodeId,
        paramName,
        value: 42,
        previousValue: 10,
        userId: 'user2' as UserId,
        timestamp: Date.now(),
      };

      (manager as any).updateParameterState(
        (manager as any).getStateKey(nodeId, paramName),
        change
      );

      const state = manager.getParameterState(nodeId, paramName);
      expect(state?.isLocked).toBe(true);
      expect(state?.lockedBy).toBe('user2');
    });
  });
});