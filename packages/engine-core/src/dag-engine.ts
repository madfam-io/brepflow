import type {
  NodeId,
  NodeInstance,
  GraphInstance,
  EvalContext,
  WorkerAPI,
} from '@brepflow/types';
import { NodeRegistry } from './node-registry';
import { ComputeCache } from './cache';
import { hashNode } from './hash';

// Try-catch import for optional GeometryProxy to handle test environments
let GeometryProxy: any;
try {
  const occtModule = require('@brepflow/engine-occt');
  GeometryProxy = occtModule.GeometryProxy;
} catch (error) {
  // Fallback for test environments or when OCCT is not available
  GeometryProxy = class MockGeometryProxy {
    constructor(worker: WorkerAPI) {
      this.worker = worker;
    }
    private worker: WorkerAPI;

    async execute(operation: { type: string; params: any }): Promise<any> {
      // Mock implementation for tests
      return { type: operation.type, ...operation.params };
    }
  };
}

export interface DAGEngineOptions {
  worker: WorkerAPI;
  cache?: ComputeCache;
  registry?: NodeRegistry;
}

export class DAGEngine {
  private worker: WorkerAPI;
  private cache: ComputeCache;
  private registry: NodeRegistry;
  private evaluating = new Set<NodeId>();
  private abortControllers = new Map<NodeId, AbortController>();

  constructor(options: DAGEngineOptions) {
    this.worker = options.worker;
    this.cache = options.cache || new ComputeCache();
    this.registry = options.registry || NodeRegistry.getInstance();
  }

  // Expose geometry API for compatibility
  get geometryAPI(): WorkerAPI {
    return this.worker;
  }

  /**
   * Evaluate a graph with dirty propagation
   */
  async evaluate(graph: GraphInstance, dirtyNodes: Set<NodeId>): Promise<void> {
    // Build dependency graph
    const deps = this.buildDependencyGraph(graph);

    // Get topological order
    const evalOrder = this.topologicalSort(graph.nodes, deps);

    // Find affected nodes
    const affected = this.findAffectedNodes(dirtyNodes, deps, evalOrder);

    // Evaluate affected nodes in order
    for (const nodeId of evalOrder) {
      if (!affected.has(nodeId)) continue;

      try {
        await this.evaluateNode(graph, nodeId);
      } catch (error) {
        console.error(`Failed to evaluate node ${nodeId}:`, error);
        // Mark node as errored
        const node = graph.nodes.find(n => n.id === nodeId);
        if (node) {
          node.state = { ...node.state, error: error instanceof Error ? error.message : String(error) };
        }
      }
    }
  }

  /**
   * Evaluate a single node
   */
  private async evaluateNode(graph: GraphInstance, nodeId: NodeId): Promise<void> {
    const node = graph.nodes.find(n => n.id === nodeId);
    if (!node) throw new Error(`Node ${nodeId} not found`);

    // Check if already evaluating (circular dependency)
    if (this.evaluating.has(nodeId)) {
      throw new Error(`Circular dependency detected at node ${nodeId}`);
    }

    this.evaluating.add(nodeId);

    try {
      // Get node definition
      const definition = this.registry.getNode(node.type);
      if (!definition) {
        throw new Error(`Unknown node type: ${node.type}`);
      }

      // Collect input values
      const inputs = await this.collectInputs(graph, node);

      // Generate cache key
      const cacheKey = hashNode(node, inputs);

      // Check cache
      let outputs = this.cache.get(cacheKey);

      if (!outputs) {
        // Create evaluation context
        const abortController = new AbortController();
        // Create base context
        const baseContext: EvalContext = {
          nodeId,
          graph,
          cache: this.cache as unknown as Map<string, any>,
          worker: this.worker,
          abort: abortController,
        };

        // Enhance context with geometry proxy for node compatibility
        const context = this.createEnhancedContext(baseContext);

        this.abortControllers.set(nodeId, abortController);

        // Evaluate node
        outputs = await definition.evaluate(context, inputs, node.params);

        // Cache result
        this.cache.set(cacheKey, outputs);

        this.abortControllers.delete(nodeId);
      }

      // Store outputs on node
      node.outputs = outputs;
      node.dirty = false;

      // Update node state
      node.state = {
        ...node.state,
        error: undefined,
        computeTime: Date.now(),
      };
    } finally {
      this.evaluating.delete(nodeId);
    }
  }

  /**
   * Create enhanced context with geometry adapter
   * This bridges the gap between context.worker and context.geometry
   */
  private createEnhancedContext(baseContext: EvalContext): any {
    try {
      const geometry = new GeometryProxy(baseContext.worker);
      return {
        ...baseContext,
        geometry // Add geometry proxy that nodes expect
      };
    } catch (error) {
      // Fallback context without geometry proxy for test environments
      return {
        ...baseContext,
        geometry: {
          execute: async (operation: any) => ({ type: operation.type, ...operation.params })
        }
      };
    }
  }

  /**
   * Collect input values for a node
   */
  private async collectInputs(graph: GraphInstance, node: NodeInstance): Promise<any> {
    const inputs: any = {};

    for (const [inputName, socketRef] of Object.entries(node.inputs)) {
      if (!socketRef) continue;

      if (Array.isArray(socketRef)) {
        // Multiple connections
        inputs[inputName] = await Promise.all(
          socketRef.map(ref => this.getSocketValue(graph, ref))
        );
      } else {
        // Single connection
        inputs[inputName] = await this.getSocketValue(graph, socketRef);
      }
    }

    return inputs;
  }

  /**
   * Get value from a socket reference
   */
  private async getSocketValue(graph: GraphInstance, ref: any): Promise<any> {
    const sourceNode = graph.nodes.find(n => n.id === ref.nodeId);
    if (!sourceNode) {
      throw new Error(`Source node ${ref.nodeId} not found`);
    }

    // Ensure source node is evaluated
    if (sourceNode.dirty) {
      await this.evaluateNode(graph, sourceNode.id);
    }

    return sourceNode.outputs?.[ref.socketId];
  }

  /**
   * Build dependency graph from edges
   */
  private buildDependencyGraph(graph: GraphInstance): Map<NodeId, Set<NodeId>> {
    const deps = new Map<NodeId, Set<NodeId>>();

    // Initialize all nodes
    for (const node of graph.nodes) {
      deps.set(node.id, new Set());
    }

    // Add dependencies from edges
    for (const edge of graph.edges) {
      const targetDeps = deps.get(edge.target);
      if (targetDeps) {
        targetDeps.add(edge.source);
      }
    }

    return deps;
  }

  /**
   * Topological sort using Kahn's algorithm
   */
  private topologicalSort(
    nodes: NodeInstance[],
    deps: Map<NodeId, Set<NodeId>>
  ): NodeId[] {
    const result: NodeId[] = [];
    const inDegree = new Map<NodeId, number>();
    const queue: NodeId[] = [];

    // Calculate in-degrees
    for (const node of nodes) {
      inDegree.set(node.id, deps.get(node.id)?.size || 0);
    }

    // Find nodes with no dependencies
    for (const [nodeId, degree] of inDegree) {
      if (degree === 0) {
        queue.push(nodeId);
      }
    }

    // Process queue
    while (queue.length > 0) {
      const nodeId = queue.shift()!;
      result.push(nodeId);

      // Update dependent nodes
      for (const [depId, depSet] of deps) {
        if (depSet.has(nodeId)) {
          const newDegree = (inDegree.get(depId) || 0) - 1;
          inDegree.set(depId, newDegree);
          if (newDegree === 0) {
            queue.push(depId);
          }
        }
      }
    }

    // Check for cycles
    if (result.length !== nodes.length) {
      throw new Error('Cycle detected in graph');
    }

    return result;
  }

  /**
   * Find all nodes affected by dirty nodes
   */
  private findAffectedNodes(
    dirtyNodes: Set<NodeId>,
    deps: Map<NodeId, Set<NodeId>>,
    evalOrder: NodeId[]
  ): Set<NodeId> {
    const affected = new Set(dirtyNodes);

    // Propagate dirty state forward through dependencies
    for (const nodeId of evalOrder) {
      const nodeDeps = deps.get(nodeId);
      if (!nodeDeps) continue;

      for (const depId of nodeDeps) {
        if (affected.has(depId)) {
          affected.add(nodeId);
          break;
        }
      }
    }

    return affected;
  }

  /**
   * Cancel evaluation of a node
   */
  cancelNode(nodeId: NodeId): void {
    const controller = this.abortControllers.get(nodeId);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(nodeId);
    }
  }

  /**
   * Cancel all evaluations
   */
  cancelAll(): void {
    for (const controller of this.abortControllers.values()) {
      controller.abort();
    }
    this.abortControllers.clear();
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }
}