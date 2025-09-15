import React from 'react';
import { NodeIcon } from './icons/IconSystem';

const nodeCategories = [
  {
    name: 'Sketch',
    nodes: [
      { type: 'Sketch::Line', label: 'Line' },
      { type: 'Sketch::Circle', label: 'Circle' },
      { type: 'Sketch::Rectangle', label: 'Rectangle' },
      { type: 'Sketch::Arc', label: 'Arc' },
    ],
  },
  {
    name: 'Solid',
    nodes: [
      { type: 'Solid::Extrude', label: 'Extrude' },
      { type: 'Solid::Revolve', label: 'Revolve' },
      { type: 'Solid::Sweep', label: 'Sweep' },
      { type: 'Solid::Loft', label: 'Loft' },
      { type: 'Solid::Box', label: 'Box' },
      { type: 'Solid::Cylinder', label: 'Cylinder' },
      { type: 'Solid::Sphere', label: 'Sphere' },
    ],
  },
  {
    name: 'Boolean',
    nodes: [
      { type: 'Boolean::Union', label: 'Union' },
      { type: 'Boolean::Subtract', label: 'Subtract' },
      { type: 'Boolean::Intersect', label: 'Intersect' },
    ],
  },
  {
    name: 'Features',
    nodes: [
      { type: 'Features::Fillet', label: 'Fillet' },
      { type: 'Features::Chamfer', label: 'Chamfer' },
      { type: 'Features::Shell', label: 'Shell' },
      { type: 'Features::Draft', label: 'Draft' },
    ],
  },
  {
    name: 'Transform',
    nodes: [
      { type: 'Transform::Move', label: 'Move' },
      { type: 'Transform::Rotate', label: 'Rotate' },
      { type: 'Transform::Scale', label: 'Scale' },
      { type: 'Transform::Mirror', label: 'Mirror' },
      { type: 'Transform::LinearArray', label: 'Linear Array' },
      { type: 'Transform::CircularArray', label: 'Circular Array' },
    ],
  },
  {
    name: 'I/O',
    nodes: [
      { type: 'IO::ImportSTEP', label: 'Import STEP' },
      { type: 'IO::ExportSTEP', label: 'Export STEP' },
      { type: 'IO::ExportSTL', label: 'Export STL' },
    ],
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
                key={node.type}
                className="node-item"
                draggable
                onDragStart={(e) => onDragStart(e, node.type)}
                title={node.type}
              >
                <NodeIcon nodeType={node.type} size={16} className="node-item-icon" />
                <span className="node-item-label">{node.label}</span>
              </div>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}