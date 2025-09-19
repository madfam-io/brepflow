console.log('🔥 APP.TSX LOADING - DEBUG TEST');
import React, { useCallback, useEffect, useState } from 'react';
import ReactFlow, {
  Node as RFNode,
  Edge as RFEdge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Panel,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';
import 'reactflow/dist/style.css';
import CustomNode from './components/nodes/CustomNode';

const nodeTypes = {
  default: CustomNode,
  input: CustomNode,
  output: CustomNode,
};

import { NodePanel } from './components/NodePanel';
import { EnhancedNodePalette } from './components/node-palette/EnhancedNodePalette';
import './components/node-palette/EnhancedNodePalette.css';
import { Viewport } from './components/Viewport';
import { Inspector } from './components/Inspector';
import { Toolbar } from './components/Toolbar';
import { CommandPalette } from './components/CommandPalette';
import { Console } from './components/Console';
import { OnboardingOrchestrator } from './components/onboarding/OnboardingOrchestrator';
import { WorkbenchLayoutManager } from './components/layout/WorkbenchLayoutManager';
import { useGraphStore } from './store/graph-store';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useErrorTracking } from './hooks/useErrorTracking';
import { convertToReactFlow, convertFromReactFlow } from './utils/graph-converter';
import type { NodeId, SocketId } from '@brepflow/types';
import { createNodeId, createSocketId } from '@brepflow/types';
import { ErrorBoundary, WASMErrorBoundary, GeometryErrorBoundary } from './lib/error-handling/error-boundary';
import { MonitoringDashboard } from './components/monitoring/MonitoringDashboard';
import { useMonitoring, useHealthMonitoring } from './hooks/useMonitoring';
import { initializeMonitoring } from './lib/monitoring';
import { Icon } from './components/common/Icon';
import { NodeParameterDialog } from './components/dialogs/NodeParameterDialog';
import { ViewportLayoutManager } from './components/viewport/ViewportLayoutManager';
import './App.css';
import { BrowserWASMTestSuite } from './test-browser-wasm';

function AppContent() {
  const {
    graph,
    selectedNodes,
    addNode,
    removeNode,
    updateNode,
    addEdge: addGraphEdge,
    removeEdge,
    selectNode,
    evaluateGraph,
  } = useGraphStore();

  const { recordUserInteraction, executeWasmOperation } = useMonitoring();
  const { alerts } = useHealthMonitoring();
  const [showMonitoringDashboard, setShowMonitoringDashboard] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);

  // Parameter dialog state
  const [parameterDialog, setParameterDialog] = useState<{
    isOpen: boolean;
    nodeType: string;
    position: { x: number; y: number };
  }>({
    isOpen: false,
    nodeType: '',
    position: { x: 0, y: 0 },
  });

  // Initialize keyboard shortcuts for layout system
  useKeyboardShortcuts();

  // Add keyboard shortcuts for monitoring dashboard and command palette
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Ctrl+K to open command palette
      if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
        event.preventDefault();
        setShowCommandPalette(prev => !prev);
        recordUserInteraction({
          type: 'keyboard_shortcut',
          target: 'command_palette_toggle'
        });
      }
      // Ctrl+Shift+M to toggle monitoring dashboard
      if (event.ctrlKey && event.shiftKey && event.key === 'M') {
        event.preventDefault();
        setShowMonitoringDashboard(prev => !prev);
        recordUserInteraction({
          type: 'keyboard_shortcut',
          target: 'monitoring_dashboard_toggle'
        });
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [recordUserInteraction]);

  // Convert graph to ReactFlow format with enhanced node data
  const errorTracker = useErrorTracking();
  const handleOpenParameterDialog = useCallback((nodeType: string, position: { x: number; y: number }) => {
    setParameterDialog({
      isOpen: true,
      nodeType,
      position,
    });
  }, []);

  const { nodes: rfNodes, edges: rfEdges } = convertToReactFlow(graph, selectedNodes, errorTracker.errors, handleOpenParameterDialog);

  const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfEdges);

  // Debug: Log the nodes data with graph object reference
  console.log('🔍 DEBUG - Graph reference:', graph, 'nodes:', graph.nodes.length, graph.nodes);
  console.log('🔍 DEBUG - React Flow nodes:', rfNodes.length, rfNodes);
  console.log('🔍 DEBUG - Nodes state snapshot:', nodes.length, nodes);

  // Force immediate sync if there's a mismatch
  if (nodes.length !== rfNodes.length) {
    console.log('🚨 FORCE SYNC - Mismatch detected, forcing immediate sync');
    setNodes(rfNodes);
    setEdges(rfEdges);
  }

  // Sync ReactFlow state with graph store
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = convertToReactFlow(graph, selectedNodes, errorTracker.errors);
    console.log('🔄 DEBUG - Syncing nodes:', newNodes.length, newNodes);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [graph, graph.nodes, graph.edges, selectedNodes, errorTracker.errors]);

  const onConnect = useCallback(
    (params: Connection) => {
      console.log('🔗 Connection attempt:', params);
      if (params.source && params.target) {
        addGraphEdge({
          source: createNodeId(params.source),
          sourceHandle: createSocketId(params.sourceHandle || 'output'),
          target: createNodeId(params.target),
          targetHandle: createSocketId(params.targetHandle || 'input'),
        });
        console.log('✅ Edge added between', params.source, 'and', params.target);
      }
    },
    [addGraphEdge]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: RFNode) => {
    selectNode(createNodeId(node.id));
    recordUserInteraction({
      type: 'node_click',
      target: node.type,
      data: { nodeId: node.id }
    });
  }, [selectNode, recordUserInteraction]);

  const onNodesDelete = useCallback((nodes: RFNode[]) => {
    nodes.forEach(node => removeNode(createNodeId(node.id)));
  }, [removeNode]);

  const onEdgesDelete = useCallback((edges: RFEdge[]) => {
    edges.forEach(edge => removeEdge(edge.id));
  }, [removeEdge]);

  // Get default parameters based on node type
  const getDefaultParams = (nodeType: string) => {
    const type = nodeType.split('::')[1]?.toLowerCase();

    switch (type) {
      case 'box':
        return { width: 100, height: 100, depth: 100 };
      case 'cylinder':
        return { radius: 50, height: 100 };
      case 'sphere':
        return { radius: 50 };
      case 'extrude':
        return { distance: 100 };
      case 'revolve':
        return { angle: 360 };
      case 'fillet':
        return { radius: 10 };
      case 'chamfer':
        return { distance: 10 };
      case 'move':
        return { x: 0, y: 0, z: 0 };
      case 'rotate':
        return { x: 0, y: 0, z: 90 };
      case 'scale':
        return { factor: 2 };
      case 'lineararray':
        return { count: 5, spacing: 50 };
      case 'circulararray':
        return { count: 6, angle: 360 };
      default:
        return {};
    }
  };

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      const nodeType = event.dataTransfer.getData('application/reactflow');
      if (!nodeType) return;

      const reactFlowBounds = event.currentTarget.getBoundingClientRect();
      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      };

      // Open parameter dialog instead of directly creating node
      setParameterDialog({
        isOpen: true,
        nodeType,
        position,
      });

      console.log('📦 Opening parameter dialog for:', nodeType, 'at position:', position);
    },
    []
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  // Handle parameter dialog confirmation
  const handleParameterDialogConfirm = useCallback(
    (params: Record<string, any>) => {
      if (!parameterDialog.nodeType) return;

      addNode({
        type: parameterDialog.nodeType,
        position: parameterDialog.position,
        inputs: {},
        params,
      });

      console.log('📦 Node added with configured params:', parameterDialog.nodeType, params);

      recordUserInteraction({
        type: 'node_created',
        target: parameterDialog.nodeType,
        data: { params, position: parameterDialog.position }
      });
    },
    [parameterDialog, addNode, recordUserInteraction]
  );

  // Handle parameter dialog close
  const handleParameterDialogClose = useCallback(() => {
    setParameterDialog({
      isOpen: false,
      nodeType: '',
      position: { x: 0, y: 0 },
    });
  }, []);

  const selectedNode = selectedNodes.size === 1
    ? graph.nodes.find(n => n.id === Array.from(selectedNodes)[0])
    : null;

  // Auto-evaluate when graph changes with monitoring
  useEffect(() => {
    const dirtyNodes = graph.nodes.filter(n => n.dirty);
    if (dirtyNodes.length > 0) {
      // Debounce evaluation
      const timer = setTimeout(() => {
        executeWasmOperation(
          () => evaluateGraph(),
          'graph_evaluation'
        ).catch(error => {
          console.error('Graph evaluation failed:', error);
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [graph, evaluateGraph, executeWasmOperation]);

  return (
    <>
      <CommandPalette
        isOpen={showCommandPalette}
        onClose={() => setShowCommandPalette(false)}
      />
      <WorkbenchLayoutManager controlsPosition="floating">
        {{
          toolbar: (
            <ErrorBoundary>
              <Toolbar />
            </ErrorBoundary>
          ),
          nodePanel: (
            <ErrorBoundary>
              <EnhancedNodePalette
                onNodeDragStart={(event, nodeType) => {
                  event.dataTransfer.setData('application/reactflow', nodeType);
                  event.dataTransfer.effectAllowed = 'move';
                }}
                enableAdvancedSearch={true}
                enableCategoryTree={true}
                defaultViewMode="list"
              />
            </ErrorBoundary>
          ),
          nodeEditor: (
            <ErrorBoundary>
              <ReactFlow
                nodes={nodes}
                edges={edges}
                nodeTypes={nodeTypes}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnect}
                onNodeClick={onNodeClick}
                onNodesDelete={onNodesDelete}
                onEdgesDelete={onEdgesDelete}
                onDrop={onDrop}
                onDragOver={onDragOver}
                deleteKeyCode="Delete"
                fitView
                snapToGrid={true}
                snapGrid={[15, 15]}
                multiSelectionKeyCode="Shift"
                selectionKeyCode="Shift"
                panOnScroll={true}
                zoomOnScroll={true}
                zoomOnPinch={true}
                connectionLineStyle={{
                  stroke: 'var(--color-primary-500)',
                  strokeWidth: 3,
                  strokeDasharray: '5,5',
                  animation: 'dash 1s linear infinite',
                }}
                connectionLineComponent={({ fromX, fromY, toX, toY }) => (
                  <g>
                    <path
                      fill="none"
                      stroke="var(--color-primary-500)"
                      strokeWidth={3}
                      strokeDasharray="5,5"
                      d={`M${fromX},${fromY} Q ${fromX + 50},${fromY} ${toX - 50},${toY} T${toX},${toY}`}
                      style={{
                        animation: 'dash 1s linear infinite',
                      }}
                    />
                    <circle
                      cx={toX}
                      cy={toY}
                      r={4}
                      fill="var(--color-primary-500)"
                      stroke="var(--color-surface-primary)"
                      strokeWidth={2}
                    />
                  </g>
                )}
                defaultEdgeOptions={{
                  type: 'smoothstep',
                  animated: true,
                  style: {
                    stroke: 'var(--color-primary-500)',
                    strokeWidth: 2,
                  },
                  markerEnd: {
                    type: MarkerType.Arrow,
                    color: 'var(--color-primary-500)',
                  },
                }}
              >
                <Background variant={'dots' as any} gap={12} size={1} />
                <Controls />
                <MiniMap />
                <Panel position="top-left">
                  <div className="logo">BrepFlow Studio</div>
                </Panel>
                <Panel position="bottom-left">
                  <div className="status">
                    Units: {graph.units} | Tolerance: {graph.tolerance} |
                    Nodes: {graph.nodes.length} |
                    {crossOriginIsolated ? ' ✅ WASM Ready' : ' ⚠️ WASM Limited'}
                    {alerts.length > 0 && (
                      <span className="status-alerts" style={{ color: '#f59e0b', marginLeft: '0.5rem' }}>
                        | ⚠️ {alerts.length} Alert{alerts.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </div>
                </Panel>
                <Panel position="bottom-right">
                  <button
                    onClick={() => setShowMonitoringDashboard(true)}
                    className="monitoring-toggle"
                    title="Open Monitoring Dashboard (Ctrl+Shift+M)"
                    style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      border: '1px solid #d1d5db',
                      borderRadius: 'var(--radius-md)',
                      padding: '0.5rem',
                      cursor: 'pointer',
                      fontSize: '0.75rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem'
                    }}
                  >
                    <Icon name="monitor" size={14} />
                    Monitor
                  </button>
                </Panel>
              </ReactFlow>
            </ErrorBoundary>
          ),
          viewport3d: (
            <WASMErrorBoundary>
              <GeometryErrorBoundary>
                <ViewportLayoutManager
                  initialLayout="single"
                  enableKeyboardShortcuts={true}
                  showLayoutControls={true}
                  onLayoutChange={(layout) => {
                    console.log('Layout changed:', layout);
                    recordUserInteraction({
                      type: 'viewport_layout_change',
                      target: layout.type,
                      data: { viewports: layout.viewports.length }
                    });
                  }}
                  onViewportSelect={(viewportId) => {
                    console.log('Viewport selected:', viewportId);
                    recordUserInteraction({
                      type: 'viewport_select',
                      target: viewportId
                    });
                  }}
                  onCameraChange={(viewportId, camera) => {
                    console.log('Camera changed for viewport:', viewportId, camera);
                  }}
                  onRenderModeChange={(viewportId, mode) => {
                    console.log('Render mode changed for viewport:', viewportId, mode);
                    recordUserInteraction({
                      type: 'viewport_render_mode_change',
                      target: mode,
                      data: { viewportId }
                    });
                  }}
                  geometryData={graph}
                />
              </GeometryErrorBoundary>
            </WASMErrorBoundary>
          ),
          inspector: (
            <ErrorBoundary>
              <Inspector selectedNode={selectedNode || null} onParamChange={updateNode} />
            </ErrorBoundary>
          ),
          console: (
            <ErrorBoundary>
              <Console />
            </ErrorBoundary>
          )
        }}
      </WorkbenchLayoutManager>

      {/* Monitoring Dashboard */}
      <MonitoringDashboard
        isVisible={showMonitoringDashboard}
        onClose={() => setShowMonitoringDashboard(false)}
      />

      {/* Node Parameter Dialog */}
      <NodeParameterDialog
        isOpen={parameterDialog.isOpen}
        nodeType={parameterDialog.nodeType}
        onConfirm={handleParameterDialogConfirm}
        onClose={handleParameterDialogClose}
      />
    </>
  );
}

function App() {
  // Check if we're in test mode
  const isTestMode = window.location.search.includes('test=wasm');
  
  if (isTestMode) {
    return <BrowserWASMTestSuite />;
  }
  const [isMonitoringReady, setIsMonitoringReady] = useState(false);

  useEffect(() => {
    // Initialize monitoring system
    const environment = import.meta.env.MODE as 'development' | 'production';

    initializeMonitoring(environment, {
      monitoring: {
        errorReporting: {
          enabled: true,
          sampleRate: environment === 'production' ? 0.1 : 1.0,
          includeStackTrace: true
        },
        performance: {
          enabled: true,
          sampleRate: environment === 'production' ? 0.1 : 1.0
        },
        userAnalytics: {
          enabled: false,
          anonymize: true
        },
        logging: {
          level: environment === 'production' ? 'warn' : 'debug',
          console: true,
          remote: false, // Configure this based on your logging service
          structured: true
        }
      }
    }).then(() => {
      console.log('✅ BrepFlow Monitoring System initialized');
      setIsMonitoringReady(true);
    }).catch((error) => {
      console.error('❌ Failed to initialize monitoring system:', error);
      // Still allow the app to load without monitoring
      setIsMonitoringReady(true);
    });
  }, []);

  if (!isMonitoringReady) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        fontSize: '1.2rem',
        color: '#6b7280'
      }}>
        <div>
          <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
            🔧 Initializing BrepFlow Studio...
          </div>
          <div style={{ fontSize: '0.875rem', textAlign: 'center' }}>
            Setting up monitoring and error handling systems
          </div>
        </div>
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <ReactFlowProvider>
        <ErrorBoundary>
          <OnboardingOrchestrator>
            <AppContent />
          </OnboardingOrchestrator>
        </ErrorBoundary>
      </ReactFlowProvider>
    </ErrorBoundary>
  );
}

export default App;