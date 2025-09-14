import React, { useCallback, useEffect } from 'react';
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
import { useGraphStore } from './store/graph-store';
import { convertToReactFlow, convertFromReactFlow } from './utils/graph-converter';
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
  }, [selectNode]);

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

  // Auto-evaluate when graph changes
  useEffect(() => {
    const dirtyNodes = graph.nodes.filter(n => n.dirty);
    if (dirtyNodes.length > 0) {
      // Debounce evaluation
      const timer = setTimeout(() => {
        evaluateGraph();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [graph, evaluateGraph]);

  return (
    <div className="app">
      <Toolbar />

      <div className="sidebar-left">
        <NodePanel />
      </div>

      <div className="main-content">
        <div className="node-editor">
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
              </div>
            </Panel>
          </ReactFlow>
        </div>

        <div className="viewport-3d">
          <Viewport />
        </div>
      </div>

      <div className="sidebar-right">
        <Inspector selectedNode={selectedNode || null} onParamChange={updateNode} />
      </div>
    </div>
  );
}

function App() {
  return (
    <ReactFlowProvider>
      <AppContent />
    </ReactFlowProvider>
  );
}

export default App;