/**
 * Collaboration Features Test Suite
 * Comprehensive integration tests for all collaboration functionality
 */

import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { BrepFlowCollaborationEngine } from '../collaboration-engine';
import { ParameterSynchronizer } from '../parameter-sync';
import {
  MockWebSocketClient,
  createTestUser,
  createTestOperation,
  createTestCursor,
  createTestSelection,
  createTestConfig,
  CollaborationTestHarness,
  waitFor,
  delay,
} from './test-utils';
import type { SessionId, UserId } from '../types';

describe('Collaboration Features Integration', () => {
  let engine: BrepFlowCollaborationEngine;
  let harness: CollaborationTestHarness;

  beforeEach(() => {
    const config = createTestConfig();
    engine = new BrepFlowCollaborationEngine(config);
    harness = new CollaborationTestHarness();
  });

  afterEach(() => {
    harness.clearAllMessageQueues();
  });

  describe('Multi-User Session Workflow', () => {
    it('should handle complete collaboration workflow', async () => {
      // Create users
      const user1 = createTestUser('user1', { name: 'Alice' });
      const user2 = createTestUser('user2', { name: 'Bob' });
      const user3 = createTestUser('user3', { name: 'Charlie' });

      const client1 = harness.addUser(user1);
      const client2 = harness.addUser(user2);
      const client3 = harness.addUser(user3);

      // User 1 creates a session
      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);

      // User 2 and 3 join
      await engine.joinSession(sessionId, user2);
      await engine.joinSession(sessionId, user3);

      // Verify all users are in session
      const session = await engine.getSession(sessionId);
      expect(session?.users.size).toBe(3);
      expect(session?.users.get(user1.id)?.name).toBe('Alice');
      expect(session?.users.get(user2.id)?.name).toBe('Bob');
      expect(session?.users.get(user3.id)?.name).toBe('Charlie');

      // Users perform operations
      const op1 = createTestOperation('CREATE_NODE', {
        userId: user1.id,
        nodeId: 'node1',
        nodeType: 'Math::Add',
      });

      const op2 = createTestOperation('CREATE_NODE', {
        userId: user2.id,
        nodeId: 'node2',
        nodeType: 'Math::Multiply',
      });

      await engine.applyOperation(sessionId, op1);
      await engine.applyOperation(sessionId, op2);

      // Verify operations were applied
      const updatedSession = await engine.getSession(sessionId);
      expect(updatedSession?.state.nodes.size).toBe(2);
      expect(updatedSession?.state.nodes.get('node1')?.type).toBe('Math::Add');
      expect(updatedSession?.state.nodes.get('node2')?.type).toBe('Math::Multiply');

      // Test presence updates
      const cursor1 = createTestCursor({ x: 100, y: 200 });
      const selection2 = createTestSelection(['node1'], []);

      await engine.broadcastCursor(sessionId, user1.id, cursor1);
      await engine.broadcastSelection(sessionId, user2.id, selection2);

      // Verify presence state
      const presence = await engine.getPresence(sessionId);
      expect(presence.cursors.get(user1.id)).toEqual(cursor1);
      expect(presence.selections.get(user2.id)).toEqual(selection2);

      // User leaves session
      await engine.leaveSession(sessionId, user3.id);

      const finalSession = await engine.getSession(sessionId);
      expect(finalSession?.users.size).toBe(2);
      expect(finalSession?.users.has(user3.id)).toBe(false);
    });

    it('should handle rapid concurrent operations', async () => {
      const user1 = createTestUser('user1');
      const user2 = createTestUser('user2');

      harness.addUser(user1);
      harness.addUser(user2);

      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);
      await engine.joinSession(sessionId, user2);

      // Create many operations concurrently
      const operations = [];
      for (let i = 0; i < 20; i++) {
        const userId = i % 2 === 0 ? user1.id : user2.id;
        operations.push(
          createTestOperation('CREATE_NODE', {
            userId,
            nodeId: `node${i}`,
            nodeType: 'Math::Add',
            timestamp: Date.now() + i, // Ensure different timestamps
          })
        );
      }

      // Apply all operations
      await Promise.all(
        operations.map(op => engine.applyOperation(sessionId, op))
      );

      // Verify all operations were processed
      const session = await engine.getSession(sessionId);
      expect(session?.state.nodes.size).toBe(20);
      expect(session?.operations.length).toBe(20);
    });

    it('should resolve parameter conflicts correctly', async () => {
      const user1 = createTestUser('user1');
      const user2 = createTestUser('user2');

      harness.addUser(user1);
      harness.addUser(user2);

      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);
      await engine.joinSession(sessionId, user2);

      // Create a node first
      const createOp = createTestOperation('CREATE_NODE', {
        userId: user1.id,
        nodeId: 'shared-node',
        nodeType: 'Math::Add',
      });
      await engine.applyOperation(sessionId, createOp);

      // Both users update the same parameter simultaneously
      const paramOp1 = createTestOperation('UPDATE_NODE_PARAMS', {
        userId: user1.id,
        nodeId: 'shared-node',
        paramUpdates: { value: 10 },
        previousValues: { value: 0 },
        timestamp: 1000,
      });

      const paramOp2 = createTestOperation('UPDATE_NODE_PARAMS', {
        userId: user2.id,
        nodeId: 'shared-node',
        paramUpdates: { value: 20 },
        previousValues: { value: 0 },
        timestamp: 1001, // Later timestamp
      });

      await Promise.all([
        engine.applyOperation(sessionId, paramOp1),
        engine.applyOperation(sessionId, paramOp2),
      ]);

      // Verify conflict resolution (later timestamp should win)
      const session = await engine.getSession(sessionId);
      const node = session?.state.nodes.get('shared-node');
      expect(node?.params.value).toBe(20); // User 2's value should win
    });
  });

  describe('Real-time Synchronization', () => {
    it('should maintain consistency across network issues', async () => {
      const user1 = createTestUser('user1');
      const user2 = createTestUser('user2');

      const client1 = harness.addUser(user1);
      const client2 = harness.addUser(user2);

      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);
      await engine.joinSession(sessionId, user2);

      // Simulate network partition
      harness.simulateNetworkPartition([user2.id]);

      // User 1 continues working (operations queued)
      const op1 = createTestOperation('CREATE_NODE', {
        userId: user1.id,
        nodeId: 'node1',
      });
      await engine.applyOperation(sessionId, op1);

      // Simulate network reconnection
      harness.simulateNetworkReconnection([user2.id]);

      // User 2 should eventually receive the operation
      await waitFor(() => {
        const messages = client2.getMessageQueue();
        return messages.some(msg =>
          msg.type === 'operation' &&
          msg.data.nodeId === 'node1'
        );
      });

      const session = await engine.getSession(sessionId);
      expect(session?.state.nodes.has('node1')).toBe(true);
    });

    it('should throttle cursor and selection updates', async () => {
      const user1 = createTestUser('user1');
      const client1 = harness.addUser(user1);

      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);

      client1.clearMessageQueue();

      // Send rapid cursor updates
      for (let i = 0; i < 10; i++) {
        await engine.broadcastCursor(sessionId, user1.id, createTestCursor({ x: i * 10 }));
      }

      // Should have fewer messages due to throttling
      await delay(200); // Wait for throttling
      const messages = client1.getMessageQueue();
      const cursorMessages = messages.filter(msg => msg.type === 'cursor');
      expect(cursorMessages.length).toBeLessThan(10);
    });
  });

  describe('Parameter Synchronization', () => {
    it('should synchronize parameters with locking', async () => {
      const config = createTestConfig();
      const synchronizer = new ParameterSynchronizer(engine, {
        throttleDelay: 50,
        batchDelay: 25,
        conflictResolutionStrategy: 'last-writer-wins',
        enableParameterLocking: true,
        lockTimeout: 1000,
      });

      const sessionId = 'test-session' as SessionId;
      const nodeId = 'test-node';
      const paramName = 'value';
      const user1 = 'user1' as UserId;
      const user2 = 'user2' as UserId;

      // User 1 acquires lock
      const locked = await synchronizer.lockParameter(nodeId, paramName, user1);
      expect(locked).toBe(true);

      // User 2 tries to update locked parameter
      try {
        await synchronizer.updateParameter(sessionId, nodeId, paramName, 42, user2);
        expect(true).toBe(false); // Should not reach here
      } catch (error) {
        expect(error.message).toContain('locked');
      }

      // User 1 can update
      await synchronizer.updateParameter(sessionId, nodeId, paramName, 24, user1);

      // Release lock
      const released = await synchronizer.releaseParameterLock(nodeId, paramName, user1);
      expect(released).toBe(true);

      // Now user 2 can update
      await expect(
        synchronizer.updateParameter(sessionId, nodeId, paramName, 42, user2)
      ).resolves.not.toThrow();
    });

    it('should handle lock timeouts', async () => {
      const config = createTestConfig();
      const synchronizer = new ParameterSynchronizer(engine, {
        throttleDelay: 50,
        batchDelay: 25,
        conflictResolutionStrategy: 'last-writer-wins',
        enableParameterLocking: true,
        lockTimeout: 100, // Short timeout for testing
      });

      const nodeId = 'test-node';
      const paramName = 'value';
      const user1 = 'user1' as UserId;
      const user2 = 'user2' as UserId;

      // User 1 acquires lock
      await synchronizer.lockParameter(nodeId, paramName, user1);

      // Wait for lock to expire
      await delay(150);

      // User 2 should now be able to acquire lock
      const isLocked = synchronizer.isParameterLocked(nodeId, paramName, user2);
      expect(isLocked).toBe(false);
    });
  });

  describe('Error Handling and Recovery', () => {
    it('should handle malformed operations gracefully', async () => {
      const user1 = createTestUser('user1');
      harness.addUser(user1);

      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);

      // Create malformed operation
      const malformedOp = {
        id: 'bad-op',
        type: 'INVALID_TYPE',
        userId: user1.id,
        timestamp: Date.now(),
        version: 0,
      } as any;

      // Should not crash the engine
      await expect(
        engine.applyOperation(sessionId, malformedOp)
      ).rejects.toThrow();

      // Engine should still be functional
      const validOp = createTestOperation('CREATE_NODE', {
        userId: user1.id,
        nodeId: 'recovery-node',
      });

      await expect(
        engine.applyOperation(sessionId, validOp)
      ).resolves.not.toThrow();

      const session = await engine.getSession(sessionId);
      expect(session?.state.nodes.has('recovery-node')).toBe(true);
    });

    it('should recover from session corruption', async () => {
      const user1 = createTestUser('user1');
      harness.addUser(user1);

      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);

      // Corrupt session state artificially
      const session = await engine.getSession(sessionId);
      if (session) {
        (session.state as any).nodes = null; // Simulate corruption
      }

      // Engine should handle this gracefully
      const operation = createTestOperation('CREATE_NODE', {
        userId: user1.id,
        nodeId: 'recovery-test',
      });

      // This might fail, but should not crash
      try {
        await engine.applyOperation(sessionId, operation);
      } catch (error) {
        expect(error).toBeDefined();
      }

      // Session should still exist
      const recoveredSession = await engine.getSession(sessionId);
      expect(recoveredSession).toBeTruthy();
    });
  });

  describe('Performance Characteristics', () => {
    it('should handle large numbers of operations efficiently', async () => {
      const user1 = createTestUser('user1');
      harness.addUser(user1);

      const sessionId = await engine.createSession('test-project', user1.id);
      await engine.joinSession(sessionId, user1);

      const startTime = Date.now();
      const operationCount = 1000;

      // Create many operations
      const operations = Array.from({ length: operationCount }, (_, i) =>
        createTestOperation('CREATE_NODE', {
          userId: user1.id,
          nodeId: `node${i}`,
          timestamp: Date.now() + i,
        })
      );

      // Apply all operations
      await Promise.all(
        operations.map(op => engine.applyOperation(sessionId, op))
      );

      const endTime = Date.now();
      const duration = endTime - startTime;

      // Should complete within reasonable time (adjust as needed)
      expect(duration).toBeLessThan(5000); // 5 seconds

      // Verify all operations were processed
      const session = await engine.getSession(sessionId);
      expect(session?.state.nodes.size).toBe(operationCount);
    });

    it('should clean up resources properly', async () => {
      const user1 = createTestUser('user1');
      const user2 = createTestUser('user2');

      harness.addUser(user1);
      harness.addUser(user2);

      // Create multiple sessions
      const sessions = [];
      for (let i = 0; i < 10; i++) {
        const sessionId = await engine.createSession(`project${i}`, user1.id);
        await engine.joinSession(sessionId, user1);
        await engine.joinSession(sessionId, user2);
        sessions.push(sessionId);
      }

      // Leave all sessions
      for (const sessionId of sessions) {
        await engine.leaveSession(sessionId, user1.id);
        await engine.leaveSession(sessionId, user2.id);
      }

      // All sessions should be cleaned up
      for (const sessionId of sessions) {
        const session = await engine.getSession(sessionId);
        expect(session).toBeNull();
      }
    });
  });
});