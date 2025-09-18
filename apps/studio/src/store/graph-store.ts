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
import { ErrorManager } from '../lib/error-handling/error-manager';
import { ErrorCode } from '../lib/error-handling/types';
import { MetricsCollector } from '../lib/monitoring/metrics-collector';
import {
  UndoRedoManager,
  AddNodeCommand,
  RemoveNodeCommand,
  UpdateNodeCommand,
  AddEdgeCommand,
  RemoveEdgeCommand,
} from '../lib/undo-redo';

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

  // Undo/Redo
  undo: () => void;
  redo: () => void;
  canUndo: () => boolean;
  canRedo: () => boolean;

  // Utility
  clearErrors: () => void;
  setError: (nodeId: NodeId, error: string) => void;
}

export const useGraphStore = create<GraphState>()(
  devtools(
    subscribeWithSelector((set, get) => {
      const graphManager = new GraphManager();
      const undoRedoManager = new UndoRedoManager();

      // Initialize DAG engine with geometry API
      const initEngine = async () => {
        try {
          const geometryAPI = await getGeometryAPI();
          await geometryAPI.init();
          console.log('🚀 Geometry API initialized successfully');

          // Record successful initialization
          try {
            const metricsCollector = MetricsCollector.getInstance();
            metricsCollector.incrementCounter('geometry_api_initializations', { status: 'success' });
          } catch (e) {
            // Metrics collector might not be ready yet
          }

          return new DAGEngine({ worker: geometryAPI });
        } catch (error) {
          console.error('❌ Failed to initialize geometry API:', error);

          // Report error to monitoring system
          try {
            const errorManager = ErrorManager.getInstance();
            errorManager.fromJavaScriptError(
              error instanceof Error ? error : new Error(String(error)),
              ErrorCode.GEOMETRY_ENGINE_NOT_INITIALIZED,
              {
                context: {
                  wasmSupport: crossOriginIsolated,
                  initializationAttempt: 1
                }
              }
            );

            const metricsCollector = MetricsCollector.getInstance();
            metricsCollector.incrementCounter('geometry_api_initializations', { status: 'failed_fallback' });
          } catch (e) {
            // Monitoring system might not be ready yet
          }

          // Fall back to mock mode
          const mockGeometryAPI = await getGeometryAPI(true);
          await mockGeometryAPI.init();
          console.warn('⚠️ Using mock geometry API');
          return new DAGEngine({ worker: mockGeometryAPI });
        }
      };

      // Initialize engine asynchronously
      let dagEngine: DAGEngine | null = null;
      initEngine().then(engine => {
        dagEngine = engine;
        set({ dagEngine: engine });
      });

      return {
        // Initial state
        graph: graphManager.getGraph(),
        selectedNodes: new Set(),
        hoveredNode: null,
        graphManager,
        dagEngine,
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

          // Create undo command
          const command = new AddNodeCommand(
            newNode,
            (n) => {
              const added = graphManager.addNode(n);
              set({ graph: graphManager.getGraph() });
              return added;
            },
            (id) => {
              graphManager.removeNode(id);
              set({ graph: graphManager.getGraph() });
            }
          );
          undoRedoManager.execute(command);

          set({ graph: graphManager.getGraph() });
          return newNode;
        },

        removeNode: (nodeId) => {
          const { selectedNodes } = get();
          const nodeToRemove = graphManager.getGraph().nodes.find(n => n.id === nodeId);

          if (nodeToRemove) {
            // Create undo command
            const command = new RemoveNodeCommand(
              nodeToRemove,
              (n) => {
                const added = graphManager.addNode(n);
                set({ graph: graphManager.getGraph() });
                return added;
              },
              (id) => {
                graphManager.removeNode(id);
                const updatedSelectedNodes = new Set(get().selectedNodes);
                updatedSelectedNodes.delete(id);
                set({
                  graph: graphManager.getGraph(),
                  selectedNodes: updatedSelectedNodes
                });
              }
            );
            undoRedoManager.execute(command);
          }

          selectedNodes.delete(nodeId);
          set({
            graph: graphManager.getGraph(),
            selectedNodes: new Set(selectedNodes),
          });
        },

        updateNode: (nodeId, updates) => {
          const node = graphManager.getGraph().nodes.find(n => n.id === nodeId);
          if (node) {
            const oldState = { ...node };

            // Create undo command
            const command = new UpdateNodeCommand(
              nodeId,
              oldState,
              updates,
              (id, upd) => {
                graphManager.updateNode(id, upd);
                set({ graph: graphManager.getGraph() });
              }
            );
            undoRedoManager.execute(command);
          }

          set({ graph: graphManager.getGraph() });
        },

        addEdge: (edge) => {
          const newEdge = graphManager.addEdge(edge);

          // Create undo command
          const command = new AddEdgeCommand(
            newEdge,
            (e) => {
              const added = graphManager.addEdge(e);
              set({ graph: graphManager.getGraph() });
              return added;
            },
            (id) => {
              graphManager.removeEdge(id);
              set({ graph: graphManager.getGraph() });
            }
          );
          undoRedoManager.execute(command);

          set({ graph: graphManager.getGraph() });
          return newEdge;
        },

        removeEdge: (edgeId) => {
          const edgeToRemove = graphManager.getGraph().edges.find(e => e.id === edgeId);

          if (edgeToRemove) {
            // Create undo command
            const command = new RemoveEdgeCommand(
              edgeToRemove,
              (e) => {
                const added = graphManager.addEdge(e);
                set({ graph: graphManager.getGraph() });
                return added;
              },
              (id) => {
                graphManager.removeEdge(id);
                set({ graph: graphManager.getGraph() });
              }
            );
            undoRedoManager.execute(command);
          }

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

            // Report engine not ready error
            try {
              const errorManager = ErrorManager.getInstance();
              errorManager.createError(
                ErrorCode.GEOMETRY_ENGINE_NOT_INITIALIZED,
                'DAG engine not initialized',
                {
                  userMessage: 'Geometry engine is not ready. Please wait a moment and try again.'
                }
              );
            } catch (e) {
              // Error manager not ready
            }

            return;
          }

          set({ isEvaluating: true, evaluationProgress: 0 });

          const startTime = performance.now();

          try {
            const dirtyNodes = graphManager.getDirtyNodes();

            // Record evaluation metrics
            try {
              const metricsCollector = MetricsCollector.getInstance();
              metricsCollector.incrementCounter('graph_evaluations_started', {
                dirtyNodeCount: dirtyNodes.size.toString()
              });
            } catch (e) {
              // Metrics collector not ready
            }

            await dagEngine.evaluate(graphManager.getGraph(), dirtyNodes);
            graphManager.clearDirtyFlags();

            const duration = performance.now() - startTime;

            // Record successful evaluation
            try {
              const metricsCollector = MetricsCollector.getInstance();
              metricsCollector.recordTiming('graph_evaluation_duration_ms', duration);
              metricsCollector.incrementCounter('graph_evaluations_completed', { status: 'success' });
            } catch (e) {
              // Metrics collector not ready
            }

            set({
              graph: graphManager.getGraph(),
              isEvaluating: false,
              evaluationProgress: 100,
            });
          } catch (error) {
            console.error('Evaluation failed:', error);

            const duration = performance.now() - startTime;

            // Report evaluation error
            try {
              const errorManager = ErrorManager.getInstance();
              errorManager.fromJavaScriptError(
                error instanceof Error ? error : new Error(String(error)),
                ErrorCode.EVALUATION_TIMEOUT,
                {
                  context: {
                    evaluationDuration: duration,
                    nodeCount: graphManager.getGraph().nodes.length,
                    edgeCount: graphManager.getGraph().edges.length
                  }
                }
              );

              const metricsCollector = MetricsCollector.getInstance();
              metricsCollector.recordTiming('graph_evaluation_duration_ms', duration, { status: 'failed' });
              metricsCollector.incrementCounter('graph_evaluations_completed', { status: 'failed' });
            } catch (e) {
              // Monitoring system not ready
            }

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
          undoRedoManager.clear(); // Clear undo history when clearing graph
          set({
            graph: emptyGraph,
            selectedNodes: new Set(),
            errors: new Map(),
          });
        },

        // Undo/Redo
        undo: () => {
          undoRedoManager.undo();
        },

        redo: () => {
          undoRedoManager.redo();
        },

        canUndo: () => {
          return undoRedoManager.canUndo();
        },

        canRedo: () => {
          return undoRedoManager.canRedo();
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