import { create } from 'zustand';
import { devtools, subscribeWithSelector } from 'zustand/middleware';
import type {
  GraphInstance,
  NodeInstance,
  Edge,
  NodeId,
} from '@brepflow/types';
import {
  GraphManager,
  DAGEngine,
  NodeRegistry,
  ComputeCache,
} from '@brepflow/engine-core';
import { getGeometryAPI } from '@brepflow/engine-occt';
import { registerCoreNodes } from '@brepflow/nodes-core';

// Register core nodes on initialization
registerCoreNodes();

interface GraphState {
  // Graph data
  graph: GraphInstance;
  selectedNodes: Set<NodeId>;
  hoveredNode: NodeId | null;

  // Managers
  graphManager: GraphManager;
  dagEngine: DAGEngine | null;

  // State
  isEvaluating: boolean;
  evaluationProgress: number;
  errors: Map<NodeId, string>;

  // Actions
  setGraph: (graph: GraphInstance) => void;
  addNode: (node: Omit<NodeInstance, 'id'>) => NodeInstance;
  removeNode: (nodeId: NodeId) => void;
  updateNode: (nodeId: NodeId, updates: Partial<NodeInstance>) => void;
  addEdge: (edge: Omit<Edge, 'id'>) => Edge;
  removeEdge: (edgeId: string) => void;

  // Selection
  selectNode: (nodeId: NodeId | null) => void;
  selectNodes: (nodeIds: NodeId[]) => void;
  deselectNode: (nodeId: NodeId) => void;
  clearSelection: () => void;
  setHoveredNode: (nodeId: NodeId | null) => void;

  // Evaluation
  evaluateGraph: () => Promise<void>;
  cancelEvaluation: () => void;

  // File operations
  loadGraph: (json: string) => void;
  saveGraph: () => string;
  exportGraph: () => GraphInstance;
  importGraph: (graph: GraphInstance) => void;
  clearGraph: () => void;

  // Utility
  clearErrors: () => void;
  setError: (nodeId: NodeId, error: string) => void;
}

export const useGraphStore = create<GraphState>()(
  devtools(
    subscribeWithSelector((set, get) => {
      const graphManager = new GraphManager();

      // Initialize DAG engine with OCCT geometry API
      const initEngine = async () => {
        try {
          const geometryAPI = getGeometryAPI(); // Uses OCCT by default now
          await geometryAPI.init();
          console.log('🚀 Geometry API initialized successfully');
          return new DAGEngine({ worker: geometryAPI });
        } catch (error) {
          console.error('❌ Failed to initialize geometry API:', error);
          // Fall back to mock mode
          const mockGeometryAPI = getGeometryAPI(true);
          await mockGeometryAPI.init();
          console.warn('⚠️ Using mock geometry API');
          return new DAGEngine({ worker: mockGeometryAPI });
        }
      };

      initEngine().then(engine => {
        set({ dagEngine: engine });
      });

      return {
        // Initial state
        graph: graphManager.getGraph(),
        selectedNodes: new Set(),
        hoveredNode: null,
        graphManager,
        dagEngine: null,
        isEvaluating: false,
        evaluationProgress: 0,
        errors: new Map(),

        // Graph actions
        setGraph: (graph) => {
          graphManager.setGraph(graph);
          set({ graph, errors: new Map() });
        },

        addNode: (node) => {
          const newNode = graphManager.addNode(node);
          set({ graph: graphManager.getGraph() });
          return newNode;
        },

        removeNode: (nodeId) => {
          const { selectedNodes } = get();
          graphManager.removeNode(nodeId);
          selectedNodes.delete(nodeId);
          set({
            graph: graphManager.getGraph(),
            selectedNodes: new Set(selectedNodes),
          });
        },

        updateNode: (nodeId, updates) => {
          graphManager.updateNode(nodeId, updates);
          set({ graph: graphManager.getGraph() });
        },

        addEdge: (edge) => {
          const newEdge = graphManager.addEdge(edge);
          set({ graph: graphManager.getGraph() });
          return newEdge;
        },

        removeEdge: (edgeId) => {
          graphManager.removeEdge(edgeId);
          set({ graph: graphManager.getGraph() });
        },

        // Selection
        selectNode: (nodeId) => {
          if (nodeId) {
            set({ selectedNodes: new Set([nodeId]) });
          } else {
            set({ selectedNodes: new Set() });
          }
        },

        selectNodes: (nodeIds) => {
          set({ selectedNodes: new Set(nodeIds) });
        },

        deselectNode: (nodeId) => {
          const { selectedNodes } = get();
          selectedNodes.delete(nodeId);
          set({ selectedNodes: new Set(selectedNodes) });
        },

        clearSelection: () => {
          set({ selectedNodes: new Set() });
        },

        setHoveredNode: (nodeId) => {
          set({ hoveredNode: nodeId });
        },

        // Evaluation
        evaluateGraph: async () => {
          const { dagEngine, graphManager } = get();
          if (!dagEngine) {
            console.warn('DAG engine not initialized');
            return;
          }

          set({ isEvaluating: true, evaluationProgress: 0 });

          try {
            const dirtyNodes = graphManager.getDirtyNodes();
            await dagEngine.evaluate(graphManager.getGraph(), dirtyNodes);
            graphManager.clearDirtyFlags();
            set({
              graph: graphManager.getGraph(),
              isEvaluating: false,
              evaluationProgress: 100,
            });
          } catch (error) {
            console.error('Evaluation failed:', error);
            set({
              isEvaluating: false,
              evaluationProgress: 0,
            });
          }
        },

        cancelEvaluation: () => {
          const { dagEngine } = get();
          if (dagEngine) {
            dagEngine.cancelAll();
          }
          set({ isEvaluating: false, evaluationProgress: 0 });
        },

        // File operations
        loadGraph: (json) => {
          try {
            graphManager.fromJSON(json);
            set({
              graph: graphManager.getGraph(),
              selectedNodes: new Set(),
              errors: new Map(),
            });
          } catch (error) {
            console.error('Failed to load graph:', error);
          }
        },

        saveGraph: () => {
          return graphManager.toJSON();
        },

        exportGraph: () => {
          return graphManager.getGraph();
        },

        importGraph: (graph) => {
          graphManager.setGraph(graph);
          set({
            graph,
            selectedNodes: new Set(),
            errors: new Map(),
          });
        },

        clearGraph: () => {
          const emptyGraph: GraphInstance = {
            version: '0.1.0',
            units: 'mm',
            tolerance: 0.001,
            nodes: [],
            edges: [],
          };
          graphManager.setGraph(emptyGraph);
          set({
            graph: emptyGraph,
            selectedNodes: new Set(),
            errors: new Map(),
          });
        },

        // Utility
        clearErrors: () => {
          set({ errors: new Map() });
        },

        setError: (nodeId, error) => {
          const { errors } = get();
          errors.set(nodeId, error);
          set({ errors: new Map(errors) });
        },
      };
    }),
    {
      name: 'graph-store',
    }
  )
);