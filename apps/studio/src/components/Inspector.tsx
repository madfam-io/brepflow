import React from 'react';
import { Node } from 'reactflow';

interface InspectorProps {
  selectedNode: Node | null;
}

export function Inspector({ selectedNode }: InspectorProps) {
  return (
    <div className="inspector">
      <h3>Inspector</h3>

      {selectedNode ? (
        <div className="inspector-content">
          <div className="inspector-section">
            <h4>Node: {selectedNode.data.label}</h4>
            <p className="node-id">ID: {selectedNode.id}</p>
          </div>

          <div className="inspector-section">
            <h4>Parameters</h4>
            <div className="parameter">
              <label>Distance</label>
              <input type="number" defaultValue="25" step="0.1" />
              <span className="unit">mm</span>
            </div>
            <div className="parameter">
              <label>Draft Angle</label>
              <input type="number" defaultValue="0" step="0.5" />
              <span className="unit">°</span>
            </div>
            <div className="parameter">
              <label>Direction</label>
              <select>
                <option>Normal</option>
                <option>X Axis</option>
                <option>Y Axis</option>
                <option>Z Axis</option>
              </select>
            </div>
          </div>

          <div className="inspector-section">
            <h4>Compute</h4>
            <p className="compute-time">Last: 125ms</p>
            <p className="compute-status">✅ Success</p>
          </div>
        </div>
      ) : (
        <div className="inspector-empty">
          <p>Select a node to view properties</p>
        </div>
      )}

      <div className="inspector-section">
        <h4>Console</h4>
        <div className="console">
          <div className="console-entry info">
            ℹ️ Graph loaded: 2 nodes, 0 edges
          </div>
          <div className="console-entry success">
            ✅ WASM module initialized
          </div>
          {!crossOriginIsolated && (
            <div className="console-entry warning">
              ⚠️ SharedArrayBuffer unavailable - threading disabled
            </div>
          )}
        </div>
      </div>
    </div>
  );
}