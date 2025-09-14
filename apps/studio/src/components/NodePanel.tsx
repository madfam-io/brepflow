import React from 'react';

const nodeCategories = [
  {
    name: 'Sketch',
    nodes: ['Line', 'Circle', 'Arc', 'Rectangle', 'NURBS Curve'],
  },
  {
    name: 'Solid',
    nodes: ['Extrude', 'Revolve', 'Sweep', 'Loft'],
  },
  {
    name: 'Boolean',
    nodes: ['Union', 'Subtract', 'Intersect'],
  },
  {
    name: 'Features',
    nodes: ['Fillet', 'Chamfer', 'Shell', 'Draft'],
  },
  {
    name: 'Transform',
    nodes: ['Move', 'Rotate', 'Scale', 'Mirror', 'Array'],
  },
];

export function NodePanel() {
  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  return (
    <div className="node-panel">
      <h3>Nodes</h3>
      <input type="text" placeholder="Search nodes..." className="search-input" />

      {nodeCategories.map((category) => (
        <details key={category.name} open>
          <summary>{category.name}</summary>
          <div className="node-list">
            {category.nodes.map((node) => (
              <div
                key={node}
                className="node-item"
                draggable
                onDragStart={(e) => onDragStart(e, node)}
              >
                {node}
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}