import { describe, it, expect, beforeEach, vi } from 'vitest';
import { DAGEngine } from './dag-engine';
import { NodeRegistry } from './node-registry';
import { ComputeCache } from './cache';
import type {
  NodeInstance,
  GraphInstance,
  WorkerAPI,
  EvalContext,
  NodeDefinition
} from '@brepflow/types';

describe('DAGEngine', () => {
  let dagEngine: DAGEngine;
  let mockWorker: WorkerAPI;
  let mockRegistry: NodeRegistry;
  let mockCache: ComputeCache;

  beforeEach(() => {
    // Create mock worker
    mockWorker = {
      tessellate: vi.fn().mockResolvedValue({
        vertices: new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0]),
        indices: new Uint32Array([0, 1, 2]),
        normals: new Float32Array([0, 0, 1, 0, 0, 1, 0, 0, 1])
      }),
      invoke: vi.fn().mockResolvedValue({ id: 'shape-1', type: 'shape' }),
      dispose: vi.fn().mockResolvedValue(undefined),
      getMetadata: vi.fn().mockResolvedValue({ volume: 100, area: 50 }),
      exportToFormat: vi.fn().mockResolvedValue(new Uint8Array([1, 2, 3])),
      importFromFormat: vi.fn().mockResolvedValue({ id: 'imported-1', type: 'shape' })
    };

    // Create mock registry
    mockRegistry = new NodeRegistry();

    // Create mock cache
    mockCache = new ComputeCache();

    // Create DAG engine with mocks
    dagEngine = new DAGEngine({
      worker: mockWorker,
      cache: mockCache,
      registry: mockRegistry
    });
  });

  describe('Basic Operations', () => {
    it('should initialize with provided options', () => {
      expect(dagEngine).toBeDefined();
      expect(dagEngine.geometryAPI).toBe(mockWorker);
    });

    it('should expose geometry API for compatibility', () => {
      expect(dagEngine.geometryAPI).toBe(mockWorker);
      expect(dagEngine.geometryAPI.tessellate).toBeDefined();
    });

    it('should clear cache', () => {
      const clearSpy = vi.spyOn(mockCache, 'clear');
      dagEngine.clearCache();
      expect(clearSpy).toHaveBeenCalled();
    });
  });

  describe('Graph Evaluation', () => {
    it('should evaluate a simple graph', async () => {
      // Register a test node
      const testNodeDef: NodeDefinition = {
        type: 'Test::Simple',
        params: { value: { type: 'number', default: 42 } },
        inputs: {},
        outputs: { result: 'number' },
        evaluate: vi.fn().mockResolvedValue({ result: 42 })
      };
      mockRegistry.registerNode(testNodeDef);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-1',
            type: 'Test::Simple',
            position: { x: 0, y: 0 },
            params: { value: 42 },
            inputs: {},
            outputs: {},
            dirty: true
          }
        ],
        edges: []
      };

      const dirtyNodes = new Set(['node-1']);
      await dagEngine.evaluate(graph, dirtyNodes);

      expect(testNodeDef.evaluate).toHaveBeenCalled();
      expect(graph.nodes[0].outputs).toEqual({ result: 42 });
      expect(graph.nodes[0].dirty).toBe(false);
    });

    it('should evaluate nodes in topological order', async () => {
      const evaluationOrder: string[] = [];

      // Register test nodes
      const nodeA: NodeDefinition = {
        type: 'Test::NodeA',
        params: {},
        inputs: {},
        outputs: { value: 'number' },
        evaluate: vi.fn().mockImplementation(async (ctx) => {
          evaluationOrder.push('A');
          return { value: 1 };
        })
      };

      const nodeB: NodeDefinition = {
        type: 'Test::NodeB',
        params: {},
        inputs: { input: 'number' },
        outputs: { value: 'number' },
        evaluate: vi.fn().mockImplementation(async (ctx, inputs) => {
          evaluationOrder.push('B');
          return { value: (inputs.input || 0) + 1 };
        })
      };

      const nodeC: NodeDefinition = {
        type: 'Test::NodeC',
        params: {},
        inputs: { input: 'number' },
        outputs: { value: 'number' },
        evaluate: vi.fn().mockImplementation(async (ctx, inputs) => {
          evaluationOrder.push('C');
          return { value: (inputs.input || 0) + 1 };
        })
      };

      mockRegistry.registerNode(nodeA);
      mockRegistry.registerNode(nodeB);
      mockRegistry.registerNode(nodeC);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-a',
            type: 'Test::NodeA',
            position: { x: 0, y: 0 },
            params: {},
            inputs: {},
            outputs: {},
            dirty: true
          },
          {
            id: 'node-b',
            type: 'Test::NodeB',
            position: { x: 100, y: 0 },
            params: {},
            inputs: { input: { nodeId: 'node-a', socketId: 'value' } },
            outputs: {},
            dirty: true
          },
          {
            id: 'node-c',
            type: 'Test::NodeC',
            position: { x: 200, y: 0 },
            params: {},
            inputs: { input: { nodeId: 'node-b', socketId: 'value' } },
            outputs: {},
            dirty: true
          }
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'node-a',
            sourceHandle: 'value',
            target: 'node-b',
            targetHandle: 'input'
          },
          {
            id: 'edge-2',
            source: 'node-b',
            sourceHandle: 'value',
            target: 'node-c',
            targetHandle: 'input'
          }
        ]
      };

      const dirtyNodes = new Set(['node-a', 'node-b', 'node-c']);
      await dagEngine.evaluate(graph, dirtyNodes);

      // Check evaluation order
      expect(evaluationOrder).toEqual(['A', 'B', 'C']);

      // Check outputs
      expect(graph.nodes[0].outputs).toEqual({ value: 1 });
      expect(graph.nodes[1].outputs).toEqual({ value: 2 });
      expect(graph.nodes[2].outputs).toEqual({ value: 3 });
    });

    it('should handle node evaluation errors', async () => {
      const errorNode: NodeDefinition = {
        type: 'Test::Error',
        params: {},
        inputs: {},
        outputs: { result: 'any' },
        evaluate: vi.fn().mockRejectedValue(new Error('Evaluation failed'))
      };
      mockRegistry.registerNode(errorNode);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-1',
            type: 'Test::Error',
            position: { x: 0, y: 0 },
            params: {},
            inputs: {},
            outputs: {},
            dirty: true
          }
        ],
        edges: []
      };

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const dirtyNodes = new Set(['node-1']);
      await dagEngine.evaluate(graph, dirtyNodes);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to evaluate node node-1:',
        expect.any(Error)
      );
      expect(graph.nodes[0].state?.error).toBe('Evaluation failed');

      consoleErrorSpy.mockRestore();
    });

    it('should detect circular dependencies', async () => {
      // This test verifies the circular dependency detection
      // Note: The current implementation checks during evaluation, not in topological sort
      const testNode: NodeDefinition = {
        type: 'Test::Node',
        params: {},
        inputs: { input: 'any' },
        outputs: { output: 'any' },
        evaluate: vi.fn().mockResolvedValue({ output: 'value' })
      };
      mockRegistry.registerNode(testNode);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-a',
            type: 'Test::Node',
            position: { x: 0, y: 0 },
            params: {},
            inputs: { input: { nodeId: 'node-b', socketId: 'output' } },
            outputs: {},
            dirty: true
          },
          {
            id: 'node-b',
            type: 'Test::Node',
            position: { x: 100, y: 0 },
            params: {},
            inputs: { input: { nodeId: 'node-a', socketId: 'output' } },
            outputs: {},
            dirty: true
          }
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'node-a',
            sourceHandle: 'output',
            target: 'node-b',
            targetHandle: 'input'
          },
          {
            id: 'edge-2',
            source: 'node-b',
            sourceHandle: 'output',
            target: 'node-a',
            targetHandle: 'input'
          }
        ]
      };

      const dirtyNodes = new Set(['node-a', 'node-b']);

      // The topological sort should throw an error for cycles
      await expect(dagEngine.evaluate(graph, dirtyNodes)).rejects.toThrow('Cycle detected in graph');
    });

    it('should handle unknown node types', async () => {
      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-1',
            type: 'Unknown::Node',
            position: { x: 0, y: 0 },
            params: {},
            inputs: {},
            outputs: {},
            dirty: true
          }
        ],
        edges: []
      };

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const dirtyNodes = new Set(['node-1']);
      await dagEngine.evaluate(graph, dirtyNodes);

      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Failed to evaluate node node-1:',
        expect.any(Error)
      );
      expect(graph.nodes[0].state?.error).toContain('Unknown node type');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Dirty Propagation', () => {
    it('should only evaluate dirty nodes and their dependents', async () => {
      const nodeA: NodeDefinition = {
        type: 'Test::A',
        params: {},
        inputs: {},
        outputs: { value: 'number' },
        evaluate: vi.fn().mockResolvedValue({ value: 1 })
      };

      const nodeB: NodeDefinition = {
        type: 'Test::B',
        params: {},
        inputs: { input: 'number' },
        outputs: { value: 'number' },
        evaluate: vi.fn().mockResolvedValue({ value: 2 })
      };

      const nodeC: NodeDefinition = {
        type: 'Test::C',
        params: {},
        inputs: { input: 'number' },
        outputs: { value: 'number' },
        evaluate: vi.fn().mockResolvedValue({ value: 3 })
      };

      mockRegistry.registerNode(nodeA);
      mockRegistry.registerNode(nodeB);
      mockRegistry.registerNode(nodeC);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-a',
            type: 'Test::A',
            position: { x: 0, y: 0 },
            params: {},
            inputs: {},
            outputs: { value: 1 },
            dirty: true
          },
          {
            id: 'node-b',
            type: 'Test::B',
            position: { x: 100, y: 0 },
            params: {},
            inputs: { input: { nodeId: 'node-a', socketId: 'value' } },
            outputs: { value: 2 },
            dirty: false
          },
          {
            id: 'node-c',
            type: 'Test::C',
            position: { x: 200, y: 0 },
            params: {},
            inputs: { input: { nodeId: 'node-b', socketId: 'value' } },
            outputs: { value: 3 },
            dirty: false
          }
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'node-a',
            sourceHandle: 'value',
            target: 'node-b',
            targetHandle: 'input'
          },
          {
            id: 'edge-2',
            source: 'node-b',
            sourceHandle: 'value',
            target: 'node-c',
            targetHandle: 'input'
          }
        ]
      };

      // Only mark node-a as dirty
      const dirtyNodes = new Set(['node-a']);
      await dagEngine.evaluate(graph, dirtyNodes);

      // All nodes should be evaluated due to dependency chain
      expect(nodeA.evaluate).toHaveBeenCalled();
      expect(nodeB.evaluate).toHaveBeenCalled();
      expect(nodeC.evaluate).toHaveBeenCalled();
    });

    it('should not evaluate clean nodes with no dirty dependencies', async () => {
      const nodeA: NodeDefinition = {
        type: 'Test::A',
        params: {},
        inputs: {},
        outputs: { value: 'number' },
        evaluate: vi.fn().mockResolvedValue({ value: 1 })
      };

      const nodeB: NodeDefinition = {
        type: 'Test::B',
        params: {},
        inputs: {},
        outputs: { value: 'number' },
        evaluate: vi.fn().mockResolvedValue({ value: 2 })
      };

      mockRegistry.registerNode(nodeA);
      mockRegistry.registerNode(nodeB);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-a',
            type: 'Test::A',
            position: { x: 0, y: 0 },
            params: {},
            inputs: {},
            outputs: { value: 1 },
            dirty: true
          },
          {
            id: 'node-b',
            type: 'Test::B',
            position: { x: 100, y: 0 },
            params: {},
            inputs: {},
            outputs: { value: 2 },
            dirty: false
          }
        ],
        edges: []
      };

      // Only mark node-a as dirty
      const dirtyNodes = new Set(['node-a']);
      await dagEngine.evaluate(graph, dirtyNodes);

      // Only node-a should be evaluated
      expect(nodeA.evaluate).toHaveBeenCalled();
      expect(nodeB.evaluate).not.toHaveBeenCalled();
    });
  });

  describe('Caching', () => {
    it('should cache node evaluation results', async () => {
      const testNode: NodeDefinition = {
        type: 'Test::Cached',
        params: { value: { type: 'number', default: 42 } },
        inputs: {},
        outputs: { result: 'number' },
        evaluate: vi.fn().mockResolvedValue({ result: 42 })
      };
      mockRegistry.registerNode(testNode);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-1',
            type: 'Test::Cached',
            position: { x: 0, y: 0 },
            params: { value: 42 },
            inputs: {},
            outputs: {},
            dirty: true
          }
        ],
        edges: []
      };

      const dirtyNodes = new Set(['node-1']);

      // First evaluation
      await dagEngine.evaluate(graph, dirtyNodes);
      expect(testNode.evaluate).toHaveBeenCalledTimes(1);

      // Reset dirty flag for second evaluation
      graph.nodes[0].dirty = true;

      // Second evaluation should use cache
      await dagEngine.evaluate(graph, dirtyNodes);
      expect(testNode.evaluate).toHaveBeenCalledTimes(1); // Still only called once
    });

    it('should invalidate cache when inputs change', async () => {
      const testNode: NodeDefinition = {
        type: 'Test::Cached',
        params: { value: { type: 'number', default: 42 } },
        inputs: {},
        outputs: { result: 'number' },
        evaluate: vi.fn()
          .mockResolvedValueOnce({ result: 42 })
          .mockResolvedValueOnce({ result: 100 })
      };
      mockRegistry.registerNode(testNode);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-1',
            type: 'Test::Cached',
            position: { x: 0, y: 0 },
            params: { value: 42 },
            inputs: {},
            outputs: {},
            dirty: true
          }
        ],
        edges: []
      };

      const dirtyNodes = new Set(['node-1']);

      // First evaluation
      await dagEngine.evaluate(graph, dirtyNodes);
      expect(testNode.evaluate).toHaveBeenCalledTimes(1);
      expect(graph.nodes[0].outputs).toEqual({ result: 42 });

      // Change parameters
      graph.nodes[0].params = { value: 100 };
      graph.nodes[0].dirty = true;

      // Second evaluation should not use cache due to param change
      await dagEngine.evaluate(graph, dirtyNodes);
      expect(testNode.evaluate).toHaveBeenCalledTimes(2);
      expect(graph.nodes[0].outputs).toEqual({ result: 100 });
    });
  });

  describe('Cancellation', () => {
    it('should cancel evaluation of a specific node', () => {
      const abortController = new AbortController();
      const abortSpy = vi.spyOn(abortController, 'abort');

      // Set up a mock abort controller
      (dagEngine as any).abortControllers.set('node-1', abortController);

      dagEngine.cancelNode('node-1');

      expect(abortSpy).toHaveBeenCalled();
      expect((dagEngine as any).abortControllers.has('node-1')).toBe(false);
    });

    it('should cancel all evaluations', () => {
      const controller1 = new AbortController();
      const controller2 = new AbortController();
      const abort1Spy = vi.spyOn(controller1, 'abort');
      const abort2Spy = vi.spyOn(controller2, 'abort');

      // Set up mock abort controllers
      (dagEngine as any).abortControllers.set('node-1', controller1);
      (dagEngine as any).abortControllers.set('node-2', controller2);

      dagEngine.cancelAll();

      expect(abort1Spy).toHaveBeenCalled();
      expect(abort2Spy).toHaveBeenCalled();
      expect((dagEngine as any).abortControllers.size).toBe(0);
    });

    it('should handle cancellation of non-existent node', () => {
      // Should not throw
      expect(() => dagEngine.cancelNode('non-existent')).not.toThrow();
    });
  });

  describe('Input Collection', () => {
    it('should handle multiple input connections', async () => {
      const nodeA: NodeDefinition = {
        type: 'Test::Multi',
        params: {},
        inputs: { values: 'number[]' },
        outputs: { sum: 'number' },
        evaluate: vi.fn().mockImplementation(async (ctx, inputs) => {
          const sum = (inputs.values || []).reduce((a: number, b: number) => a + b, 0);
          return { sum };
        })
      };

      const nodeB: NodeDefinition = {
        type: 'Test::Value',
        params: { value: { type: 'number', default: 0 } },
        inputs: {},
        outputs: { value: 'number' },
        evaluate: vi.fn().mockImplementation(async (ctx, inputs, params) => {
          return { value: params.value };
        })
      };

      mockRegistry.registerNode(nodeA);
      mockRegistry.registerNode(nodeB);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'value-1',
            type: 'Test::Value',
            position: { x: 0, y: 0 },
            params: { value: 10 },
            inputs: {},
            outputs: {},
            dirty: true
          },
          {
            id: 'value-2',
            type: 'Test::Value',
            position: { x: 0, y: 100 },
            params: { value: 20 },
            inputs: {},
            outputs: {},
            dirty: true
          },
          {
            id: 'sum',
            type: 'Test::Multi',
            position: { x: 200, y: 50 },
            params: {},
            inputs: {
              values: [
                { nodeId: 'value-1', socketId: 'value' },
                { nodeId: 'value-2', socketId: 'value' }
              ]
            },
            outputs: {},
            dirty: true
          }
        ],
        edges: [
          {
            id: 'edge-1',
            source: 'value-1',
            sourceHandle: 'value',
            target: 'sum',
            targetHandle: 'values'
          },
          {
            id: 'edge-2',
            source: 'value-2',
            sourceHandle: 'value',
            target: 'sum',
            targetHandle: 'values'
          }
        ]
      };

      const dirtyNodes = new Set(['value-1', 'value-2', 'sum']);
      await dagEngine.evaluate(graph, dirtyNodes);

      expect(graph.nodes[2].outputs).toEqual({ sum: 30 });
    });

    it('should handle missing source nodes gracefully', async () => {
      const testNode: NodeDefinition = {
        type: 'Test::WithInput',
        params: {},
        inputs: { input: 'any' },
        outputs: { output: 'any' },
        evaluate: vi.fn().mockResolvedValue({ output: 'value' })
      };
      mockRegistry.registerNode(testNode);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-1',
            type: 'Test::WithInput',
            position: { x: 0, y: 0 },
            params: {},
            inputs: { input: { nodeId: 'missing-node', socketId: 'value' } },
            outputs: {},
            dirty: true
          }
        ],
        edges: []
      };

      const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
      const dirtyNodes = new Set(['node-1']);
      await dagEngine.evaluate(graph, dirtyNodes);

      expect(consoleErrorSpy).toHaveBeenCalled();
      expect(graph.nodes[0].state?.error).toContain('Source node missing-node not found');

      consoleErrorSpy.mockRestore();
    });
  });

  describe('Worker Integration', () => {
    it('should pass worker to evaluation context', async () => {
      let capturedContext: EvalContext | undefined;

      const testNode: NodeDefinition = {
        type: 'Test::Worker',
        params: {},
        inputs: {},
        outputs: { shape: 'shape' },
        evaluate: vi.fn().mockImplementation(async (ctx) => {
          capturedContext = ctx;
          return { shape: await ctx.worker.invoke('TEST_OP', {}) };
        })
      };
      mockRegistry.registerNode(testNode);

      const graph: GraphInstance = {
        id: 'graph-1',
        name: 'Test Graph',
        nodes: [
          {
            id: 'node-1',
            type: 'Test::Worker',
            position: { x: 0, y: 0 },
            params: {},
            inputs: {},
            outputs: {},
            dirty: true
          }
        ],
        edges: []
      };

      const dirtyNodes = new Set(['node-1']);
      await dagEngine.evaluate(graph, dirtyNodes);

      expect(capturedContext).toBeDefined();
      expect(capturedContext?.worker).toBe(mockWorker);
      expect(mockWorker.invoke).toHaveBeenCalledWith('TEST_OP', {});
    });
  });
});