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
} from 'reactflow';
import 'reactflow/dist/style.css';

import { NodePanel } from './components/NodePanel';
import { Viewport } from './components/Viewport';
import { Inspector } from './components/Inspector';
import { Toolbar } from './components/Toolbar';
import { Console } from './components/Console';
import { OnboardingOrchestrator } from './components/onboarding/OnboardingOrchestrator';
import { WorkbenchLayoutManager } from './components/layout/WorkbenchLayoutManager';
import { useGraphStore } from './store/graph-store';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { convertToReactFlow, convertFromReactFlow } from './utils/graph-converter';
import { ErrorBoundary, WASMErrorBoundary, GeometryErrorBoundary } from './lib/error-handling/error-boundary';
import { MonitoringDashboard } from './components/monitoring/MonitoringDashboard';
import { useMonitoring, useHealthMonitoring } from './hooks/useMonitoring';
import { initializeMonitoring } from './lib/monitoring';
import { Icon } from './components/common/Icon';
import './App.css';

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

  // Initialize keyboard shortcuts for layout system
  useKeyboardShortcuts();

  // Add keyboard shortcut for monitoring dashboard
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
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

  // Convert graph to ReactFlow format
  const { nodes: rfNodes, edges: rfEdges } = convertToReactFlow(graph);

  const [nodes, setNodes, onNodesChange] = useNodesState(rfNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(rfEdges);

  // Sync ReactFlow state with graph store
  useEffect(() => {
    const { nodes: newNodes, edges: newEdges } = convertToReactFlow(graph);
    setNodes(newNodes);
    setEdges(newEdges);
  }, [graph, setNodes, setEdges]);

  const onConnect = useCallback(
    (params: Connection) => {
      if (params.source && params.target && params.sourceHandle && params.targetHandle) {
        addGraphEdge({
          source: params.source,
          sourceHandle: params.sourceHandle,
          target: params.target,
          targetHandle: params.targetHandle,
        });
      }
    },
    [addGraphEdge]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: RFNode) => {
    selectNode(node.id);
    recordUserInteraction({
      type: 'node_click',
      target: node.type,
      data: { nodeId: node.id }
    });
  }, [selectNode, recordUserInteraction]);

  const onNodesDelete = useCallback((nodes: RFNode[]) => {
    nodes.forEach(node => removeNode(node.id));
  }, [removeNode]);

  const onEdgesDelete = useCallback((edges: RFEdge[]) => {
    edges.forEach(edge => removeEdge(edge.id));
  }, [removeEdge]);

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

      addNode({
        type: nodeType,
        position,
        inputs: {},
        params: {},
      });
    },
    [addNode]
  );

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
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
      <WorkbenchLayoutManager controlsPosition="floating">
        {{
          toolbar: (
            <ErrorBoundary>
              <Toolbar />
            </ErrorBoundary>
          ),
          nodePanel: (
            <ErrorBoundary>
              <NodePanel />
            </ErrorBoundary>
          ),
          nodeEditor: (
            <ErrorBoundary>
              <ReactFlow
                nodes={nodes}
                edges={edges}
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
                <Viewport />
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
    </>
  );
}

function App() {
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