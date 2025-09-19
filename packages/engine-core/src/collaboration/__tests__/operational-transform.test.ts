/**
 * Operational Transform Tests
 * Tests for conflict resolution and operation transformation
 */

import { describe, it, expect, beforeEach } from 'vitest';
import { OperationalTransformEngine } from '../operational-transform';
import type {
  Operation,
  CreateNodeOperation,
  DeleteNodeOperation,
  UpdateNodePositionOperation,
  UpdateNodeParamsOperation,
  CreateEdgeOperation,
  DeleteEdgeOperation,
  BatchOperation,
} from '../types';

describe('OperationalTransformEngine', () => {
  let engine: OperationalTransformEngine;

  beforeEach(() => {
    engine = new OperationalTransformEngine();
  });

  describe('transform', () => {
    it('should handle CREATE_NODE vs CREATE_NODE', async () => {
      const localOp: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: { a: 5, b: 3 },
      };

      const remoteOp: CreateNodeOperation = {
        id: 'op2',
        type: 'CREATE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node2',
        nodeType: 'Math::Multiply',
        position: { x: 200, y: 100 },
        params: { a: 2, b: 4 },
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result).toEqual(localOp); // No conflict, operations are independent
    });

    it('should handle conflicting CREATE_NODE with same nodeId', async () => {
      const localOp: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: { a: 5, b: 3 },
      };

      const remoteOp: CreateNodeOperation = {
        id: 'op2',
        type: 'CREATE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1', // Same node ID - conflict!
        nodeType: 'Math::Multiply',
        position: { x: 200, y: 100 },
        params: { a: 2, b: 4 },
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result.nodeId).not.toBe('node1'); // Should get a new ID
      expect(result.nodeId).toMatch(/^node1_conflict_/);
    });

    it('should handle DELETE_NODE vs UPDATE_NODE_POSITION', async () => {
      const localOp: DeleteNodeOperation = {
        id: 'op1',
        type: 'DELETE_NODE',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
      };

      const remoteOp: UpdateNodePositionOperation = {
        id: 'op2',
        type: 'UPDATE_NODE_POSITION',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
        position: { x: 150, y: 150 },
        previousPosition: { x: 100, y: 100 },
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result).toEqual(localOp); // Delete takes precedence
    });

    it('should handle UPDATE_NODE_PARAMS vs UPDATE_NODE_PARAMS', async () => {
      const localOp: UpdateNodeParamsOperation = {
        id: 'op1',
        type: 'UPDATE_NODE_PARAMS',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        paramUpdates: { a: 10 },
        previousValues: { a: 5 },
      };

      const remoteOp: UpdateNodeParamsOperation = {
        id: 'op2',
        type: 'UPDATE_NODE_PARAMS',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
        paramUpdates: { b: 20 },
        previousValues: { b: 15 },
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result).toEqual(localOp); // Different parameters, no conflict
    });

    it('should handle conflicting UPDATE_NODE_PARAMS', async () => {
      const localOp: UpdateNodeParamsOperation = {
        id: 'op1',
        type: 'UPDATE_NODE_PARAMS',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        paramUpdates: { a: 10 },
        previousValues: { a: 5 },
      };

      const remoteOp: UpdateNodeParamsOperation = {
        id: 'op2',
        type: 'UPDATE_NODE_PARAMS',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
        paramUpdates: { a: 15 }, // Same parameter, different value
        previousValues: { a: 5 },
      };

      const result = await engine.transform(localOp, remoteOp);
      // Later timestamp wins
      expect((result as UpdateNodeParamsOperation).paramUpdates.a).toBe(10);
    });

    it('should handle CREATE_EDGE vs DELETE_NODE', async () => {
      const localOp: CreateEdgeOperation = {
        id: 'op1',
        type: 'CREATE_EDGE',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        edgeId: 'edge1',
        sourceNodeId: 'node1',
        sourceSocket: 'output',
        targetNodeId: 'node2',
        targetSocket: 'input',
      };

      const remoteOp: DeleteNodeOperation = {
        id: 'op2',
        type: 'DELETE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1', // Deleting source node
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result.type).toBe('NOOP'); // Edge creation becomes no-op
    });

    it('should handle CREATE_NODE vs DELETE_NODE for same node', async () => {
      const localOp: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: {},
      };

      const remoteOp: DeleteNodeOperation = {
        id: 'op2',
        type: 'DELETE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result.type).toBe('NOOP'); // CREATE_NODE should become NOOP when node is being deleted
    });

    it('should handle BATCH with single operation against DELETE_NODE', async () => {
      const localOp: BatchOperation = {
        id: 'op1',
        type: 'BATCH',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        operations: [
          {
            id: 'sub1',
            type: 'CREATE_NODE',
            userId: 'user1',
            timestamp: 1000,
            version: 1,
            nodeId: 'node1',
            nodeType: 'Math::Add',
            position: { x: 100, y: 100 },
            params: {},
          } as CreateNodeOperation,
        ],
      };

      const remoteOp: DeleteNodeOperation = {
        id: 'op2',
        type: 'DELETE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result.type).toBe('BATCH');
      const batchResult = result as BatchOperation;
      expect(batchResult.operations).toHaveLength(0); // Single conflicting operation should be filtered out
    });

    it('should handle BATCH operations', async () => {
      const localOp: BatchOperation = {
        id: 'op1',
        type: 'BATCH',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        operations: [
          {
            id: 'sub1',
            type: 'CREATE_NODE',
            userId: 'user1',
            timestamp: 1000,
            version: 1,
            nodeId: 'node1',
            nodeType: 'Math::Add',
            position: { x: 100, y: 100 },
            params: {},
          } as CreateNodeOperation,
          {
            id: 'sub2',
            type: 'CREATE_NODE',
            userId: 'user1',
            timestamp: 1000,
            version: 1,
            nodeId: 'node2',
            nodeType: 'Math::Multiply',
            position: { x: 200, y: 100 },
            params: {},
          } as CreateNodeOperation,
        ],
      };

      const remoteOp: DeleteNodeOperation = {
        id: 'op2',
        type: 'DELETE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
      };

      const result = await engine.transform(localOp, remoteOp);
      expect(result.type).toBe('BATCH');
      const batchResult = result as BatchOperation;
      
      // Should have 1 operation remaining after filtering out the NOOP
      expect(batchResult.operations).toHaveLength(1);
      
      // The remaining operation should be the CREATE_NODE for node2
      const remainingOp = batchResult.operations[0] as CreateNodeOperation;
      expect(remainingOp.nodeId).toBe('node2');
      expect(remainingOp.type).toBe('CREATE_NODE');
    });
  });

  describe('detectConflict', () => {
    it('should detect node ID conflicts', () => {
      const op1: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: {},
      };

      const op2: CreateNodeOperation = {
        id: 'op2',
        type: 'CREATE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
        nodeType: 'Math::Multiply',
        position: { x: 200, y: 100 },
        params: {},
      };

      const conflict = engine.detectConflict(op1, op2);
      expect(conflict).toBeDefined();
      expect(conflict?.type).toBe('NODE_ID_CONFLICT');
      expect(conflict?.localOperation).toEqual(op1);
      expect(conflict?.remoteOperation).toEqual(op2);
    });

    it('should detect parameter conflicts', () => {
      const op1: UpdateNodeParamsOperation = {
        id: 'op1',
        type: 'UPDATE_NODE_PARAMS',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        paramUpdates: { a: 10 },
        previousValues: { a: 5 },
      };

      const op2: UpdateNodeParamsOperation = {
        id: 'op2',
        type: 'UPDATE_NODE_PARAMS',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node1',
        paramUpdates: { a: 15 },
        previousValues: { a: 5 },
      };

      const conflict = engine.detectConflict(op1, op2);
      expect(conflict).toBeDefined();
      expect(conflict?.type).toBe('PARAMETER_CONFLICT');
    });

    it('should not detect conflicts for independent operations', () => {
      const op1: CreateNodeOperation = {
        id: 'op1',
        type: 'CREATE_NODE',
        userId: 'user1',
        timestamp: 1000,
        version: 1,
        nodeId: 'node1',
        nodeType: 'Math::Add',
        position: { x: 100, y: 100 },
        params: {},
      };

      const op2: CreateNodeOperation = {
        id: 'op2',
        type: 'CREATE_NODE',
        userId: 'user2',
        timestamp: 1001,
        version: 1,
        nodeId: 'node2',
        nodeType: 'Math::Multiply',
        position: { x: 200, y: 100 },
        params: {},
      };

      const conflict = engine.detectConflict(op1, op2);
      expect(conflict).toBeNull();
    });
  });

  describe('resolveConflict', () => {
    it('should resolve conflicts with last-writer-wins strategy', async () => {
      const conflict = {
        type: 'PARAMETER_CONFLICT' as const,
        localOperation: {
          id: 'op1',
          type: 'UPDATE_NODE_PARAMS',
          userId: 'user1',
          timestamp: 1000,
          version: 1,
          nodeId: 'node1',
          paramUpdates: { a: 10 },
          previousValues: { a: 5 },
        } as UpdateNodeParamsOperation,
        remoteOperation: {
          id: 'op2',
          type: 'UPDATE_NODE_PARAMS',
          userId: 'user2',
          timestamp: 1001,
          version: 1,
          nodeId: 'node1',
          paramUpdates: { a: 15 },
          previousValues: { a: 5 },
        } as UpdateNodeParamsOperation,
        conflictingFields: ['a'],
      };

      const resolution = await engine.resolveConflict(conflict, 'last-writer-wins');
      expect(resolution.strategy).toBe('last-writer-wins');
      expect(resolution.resolvedOperation).toEqual(conflict.remoteOperation); // Later timestamp
    });

    it('should resolve conflicts with merge strategy', async () => {
      const conflict = {
        type: 'PARAMETER_CONFLICT' as const,
        localOperation: {
          id: 'op1',
          type: 'UPDATE_NODE_PARAMS',
          userId: 'user1',
          timestamp: 1000,
          version: 1,
          nodeId: 'node1',
          paramUpdates: { a: 10, b: 20 },
          previousValues: { a: 5, b: 15 },
        } as UpdateNodeParamsOperation,
        remoteOperation: {
          id: 'op2',
          type: 'UPDATE_NODE_PARAMS',
          userId: 'user2',
          timestamp: 1001,
          version: 1,
          nodeId: 'node1',
          paramUpdates: { a: 15, c: 25 },
          previousValues: { a: 5, c: 20 },
        } as UpdateNodeParamsOperation,
        conflictingFields: ['a'],
      };

      const resolution = await engine.resolveConflict(conflict, 'merge');
      expect(resolution.strategy).toBe('merge');

      const resolvedOp = resolution.resolvedOperation as UpdateNodeParamsOperation;
      expect(resolvedOp.paramUpdates).toEqual({ a: 15, b: 20, c: 25 }); // Merged parameters
    });
  });
});