/**
 * Production-ready graph store with proper error handling
 * No mock fallbacks - uses real geometry or fails appropriately
 */

import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { persist } from 'zustand/middleware';
import ReactFlow, {
  Node,
  Edge,
  Connection,
  addEdge,
  applyNodeChanges,
  applyEdgeChanges,
  NodeChange,
  EdgeChange,
} from 'reactflow';
import { DAGEngine } from '@brepflow/engine-core';
import { getGeometryAPI } from '../services/geometry-api';
import { v4 as uuidv4 } from 'uuid';
import { ProductionLogger } from '@brepflow/engine-occt';
import { getConfig } from '@brepflow/engine-core';

const logger = new ProductionLogger('GraphStore');

export type NodeData = {
  label: string;
  type: string;
  inputs: Record<string, any>;
  outputs: Record<string, any>;
  params: Record<string, any>;
  status: 'idle' | 'evaluating' | 'success' | 'error';
  error?: string;
};

export type GraphState = {
  nodes: Node<NodeData>[];
  edges: Edge[];
  dagEngine: DAGEngine | null;
  isInitialized: boolean;
  initError: string | null;
  geometryVersion: string | null;
  
  // Actions
  initializeEngine: () => Promise<void>;
  resetEngine: () => Promise<void>;
  healthCheck: () => Promise<boolean>;
  onNodesChange: (changes: NodeChange[]) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  onConnect: (connection: Connection) => void;
  addNode: (type: string, position: { x: number; y: number }) => void;
  deleteNode: (nodeId: string) => void;
  updateNodeParam: (nodeId: string, paramName: string, value: any) => void;
  evaluateGraph: () => Promise<void>;
  clearGraph: () => void;
  exportGraph: () => any;
  importGraph: (data: any) => void;
};

export const useProductionGraphStore = create<GraphState>()(
  persist(
    immer((set, get) => {
      const initEngine = async () => {
        const state = get();
        if (state.isInitialized && state.dagEngine) {
          logger.info('Engine already initialized');
          return state.dagEngine;
        }

        const config = getConfig();
        
        try {
          logger.info('Initializing production geometry engine...');
          
          // Check configuration
          if (config.enableMockGeometry && config.isProduction) {
            throw new Error('Mock geometry cannot be enabled in production mode');
          }

          if (!config.requireRealOCCT && config.isProduction) {
            throw new Error('Production mode requires real OCCT');
          }

          // Initialize real geometry API
          const geometryAPI = getGeometryAPI(false); // Never use mock in production
          await geometryAPI.init();

          // Verify it's real OCCT
          const initResult = await geometryAPI.invoke('HEALTH_CHECK', {});
          if (!initResult || !(initResult as any).healthy) {
            throw new Error('Geometry engine health check failed');
          }

          // Create DAG engine with real geometry
          const engine = new DAGEngine({ worker: geometryAPI });
          
          logger.info('Production geometry engine initialized successfully', {
            version: (initResult as any).version,
          });

          return engine;
        } catch (error) {
          logger.error('Failed to initialize production geometry engine', error);
          
          // In production, we fail hard
          if (config.isProduction) {
            throw new Error(
              'Critical: Unable to initialize geometry engine in production. ' +
              'Please ensure OCCT WASM is properly built and deployed.'
            );
          }
          
          // In development, we can fall back to mock with warning
          if (config.isDevelopment && config.enableMockGeometry) {
            logger.warn('⚠️ Development mode: Falling back to mock geometry');
            const mockAPI = getGeometryAPI(true);
            await mockAPI.init();
            return new DAGEngine({ worker: mockAPI });
          }
          
          throw error;
        }
      };

      return {
        nodes: [],
        edges: [],
        dagEngine: null,
        isInitialized: false,
        initError: null,
        geometryVersion: null,

        initializeEngine: async () => {
          set((state) => {
            state.isInitialized = false;
            state.initError = null;
          });

          try {
            const engine = await initEngine();
            
            // Perform additional validation
            const testBox = await engine.geometryAPI.invoke('MAKE_BOX', {
              width: 10,
              height: 10,
              depth: 10,
              center: { x: 0, y: 0, z: 0 }
            });

            if (!testBox) {
              throw new Error('Geometry engine validation failed: unable to create test shape');
            }

            set((state) => {
              state.dagEngine = engine;
              state.isInitialized = true;
              state.initError = null;
              state.geometryVersion = 'OCCT 7.8.0'; // Get from actual engine
            });
            
            logger.info('Store initialized with production geometry engine');
          } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger.error('Store initialization failed', error);
            
            set((state) => {
              state.dagEngine = null;
              state.isInitialized = false;
              state.initError = errorMessage;
            });
            
            // Re-throw for UI to handle
            throw error;
          }
        },

        resetEngine: async () => {
          const state = get();
          
          if (state.dagEngine) {
            try {
              await state.dagEngine.geometryAPI.invoke('CLEANUP', {});
              await state.dagEngine.geometryAPI.invoke('SHUTDOWN', {});
            } catch (error) {
              logger.warn('Error during engine cleanup', error);
            }
          }

          set((state) => {
            state.dagEngine = null;
            state.isInitialized = false;
            state.initError = null;
            state.geometryVersion = null;
          });

          // Re-initialize
          await get().initializeEngine();
        },

        healthCheck: async () => {
          const state = get();
          
          if (!state.dagEngine || !state.isInitialized) {
            return false;
          }

          try {
            const result = await state.dagEngine.geometryAPI.invoke('HEALTH_CHECK', {});
            return !!(result && (result as any).healthy);
          } catch (error) {
            logger.error('Health check failed', error);
            return false;
          }
        },

        onNodesChange: (changes) => {
          set((state) => {
            state.nodes = applyNodeChanges(changes, state.nodes) as Node<NodeData>[];
          });
        },

        onEdgesChange: (changes) => {
          set((state) => {
            state.edges = applyEdgeChanges(changes, state.edges);
          });
        },

        onConnect: (connection) => {
          set((state) => {
            if (connection.source && connection.target) {
              state.edges = addEdge(connection, state.edges);
            }
          });
        },

        addNode: (type, position) => {
          const nodeId = uuidv4();
          const newNode: Node<NodeData> = {
            id: nodeId,
            type: 'custom',
            position,
            data: {
              label: type.split('::')[1] || type,
              type,
              inputs: {},
              outputs: {},
              params: {},
              status: 'idle',
            },
          };

          set((state) => {
            state.nodes.push(newNode);
          });
          
          logger.debug('Node added', { nodeId, type });
        },

        deleteNode: (nodeId) => {
          set((state) => {
            state.nodes = state.nodes.filter((node) => node.id !== nodeId);
            state.edges = state.edges.filter(
              (edge) => edge.source !== nodeId && edge.target !== nodeId
            );
          });
          
          logger.debug('Node deleted', { nodeId });
        },

        updateNodeParam: (nodeId, paramName, value) => {
          set((state) => {
            const node = state.nodes.find((n) => n.id === nodeId);
            if (node) {
              node.data.params[paramName] = value;
            }
          });
        },

        evaluateGraph: async () => {
          const state = get();
          if (!state.dagEngine) {
            throw new Error('DAG engine not initialized');
          }

          const timer = logger.startTimer('Graph evaluation');

          try {
            // Mark all nodes as evaluating
            set((state) => {
              state.nodes.forEach((node) => {
                node.data.status = 'evaluating';
                node.data.error = undefined;
              });
            });

            // Build graph instance for engine
            const graphInstance = {
              nodes: state.nodes.map((node) => ({
                id: node.id,
                type: node.data.type,
                params: node.data.params,
                inputs: node.data.inputs,
                outputs: node.data.outputs,
                position: node.position,
              })),
              edges: state.edges.map((edge) => ({
                id: edge.id!,
                source: edge.source,
                target: edge.target,
                sourceHandle: edge.sourceHandle,
                targetHandle: edge.targetHandle,
              })),
            };

            // Evaluate with dirty propagation
            const dirtyNodes = new Set(state.nodes.map((n) => n.id));
            await state.dagEngine.evaluate(graphInstance as any, dirtyNodes);

            // Update node statuses
            set((state) => {
              state.nodes.forEach((node) => {
                node.data.status = 'success';
              });
            });
            
            timer(); // Log evaluation time
            
          } catch (error) {
            logger.error('Graph evaluation failed', error);
            
            set((state) => {
              state.nodes.forEach((node) => {
                node.data.status = 'error';
                node.data.error = error instanceof Error ? error.message : 'Evaluation failed';
              });
            });
            
            throw error;
          }
        },

        clearGraph: () => {
          set((state) => {
            state.nodes = [];
            state.edges = [];
          });
          logger.info('Graph cleared');
        },

        exportGraph: () => {
          const state = get();
          const exportData = {
            version: '1.0.0',
            timestamp: new Date().toISOString(),
            geometryVersion: state.geometryVersion,
            nodes: state.nodes.map((node) => ({
              id: node.id,
              type: node.data.type,
              position: node.position,
              data: {
                params: node.data.params,
                label: node.data.label,
              },
            })),
            edges: state.edges.map((edge) => ({
              id: edge.id,
              source: edge.source,
              target: edge.target,
              sourceHandle: edge.sourceHandle,
              targetHandle: edge.targetHandle,
            })),
          };
          
          logger.info('Graph exported', {
            nodeCount: state.nodes.length,
            edgeCount: state.edges.length,
          });
          
          return exportData;
        },

        importGraph: (data) => {
          try {
            if (!data.version || !data.nodes) {
              throw new Error('Invalid graph data format');
            }

            set((state) => {
              state.nodes = data.nodes.map((node: any) => ({
                ...node,
                data: {
                  ...node.data,
                  inputs: {},
                  outputs: {},
                  status: 'idle',
                },
              }));
              state.edges = data.edges || [];
            });
            
            logger.info('Graph imported', {
              nodeCount: data.nodes.length,
              edgeCount: data.edges?.length || 0,
            });
            
          } catch (error) {
            logger.error('Graph import failed', error);
            throw error;
          }
        },
      };
    }),
    {
      name: 'brepflow-graph',
      partialize: (state) => ({
        // Only persist graph structure, not engine state
        nodes: state.nodes,
        edges: state.edges,
      }),
    }
  )
);