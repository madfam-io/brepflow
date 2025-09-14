import React, { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  Connection,
  Panel,
} from 'reactflow';
import 'reactflow/dist/style.css';

import { NodePanel } from './components/NodePanel';
import { Viewport } from './components/Viewport';
import { Inspector } from './components/Inspector';
import './App.css';

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Sketch' },
    position: { x: 100, y: 100 },
  },
  {
    id: '2',
    data: { label: 'Extrude' },
    position: { x: 300, y: 100 },
  },
];

const initialEdges: Edge[] = [];

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node);
  }, []);

  return (
    <div className="app">
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
            fitView
          >
            <Background variant="dots" gap={12} size={1} />
            <Controls />
            <MiniMap />
            <Panel position="top-left">
              <div className="logo">BrepFlow Studio</div>
            </Panel>
            <Panel position="bottom-left">
              <div className="status">
                Units: mm | Tolerance: 0.001 | {crossOriginIsolated ? '✅ WASM Ready' : '⚠️ WASM Limited'}
              </div>
            </Panel>
          </ReactFlow>
        </div>

        <div className="viewport-3d">
          <Viewport />
        </div>
      </div>

      <div className="sidebar-right">
        <Inspector selectedNode={selectedNode} />
      </div>
    </div>
  );
}

export default App;