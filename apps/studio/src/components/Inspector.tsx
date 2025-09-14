import React from 'react';
import type { NodeInstance } from '@brepflow/types';
import './Inspector.css';

interface InspectorProps {
  selectedNode: NodeInstance | null;
  onParamChange: (nodeId: string, updates: Partial<NodeInstance>) => void;
}

export function Inspector({ selectedNode, onParamChange }: InspectorProps) {
  if (!selectedNode) {
    return (
      <div className="inspector">
        <div className="inspector-empty">
          Select a node to view properties
        </div>
      </div>
    );
  }

  const handleParamChange = (key: string, value: any) => {
    // Parse numbers if applicable
    let parsedValue = value;
    if (!isNaN(Number(value)) && value !== '') {
      parsedValue = Number(value);
    }

    onParamChange(selectedNode.id, {
      params: {
        ...selectedNode.params,
        [key]: parsedValue,
      },
      dirty: true, // Mark as dirty for re-evaluation
    });
  };

  const formatNodeType = (type: string) => {
    const parts = type.split('::');
    return parts[parts.length - 1];
  };

  return (
    <div className="inspector">
      <div className="inspector-header">
        <h3>{formatNodeType(selectedNode.type)}</h3>
        <div className="inspector-type">{selectedNode.type}</div>
        <div className="inspector-id">{selectedNode.id}</div>
      </div>

      {selectedNode.params && Object.keys(selectedNode.params).length > 0 && (
        <div className="inspector-section">
          <h4>Parameters</h4>
          {Object.entries(selectedNode.params).map(([key, value]) => (
            <div key={key} className="inspector-field">
              <label>{key}</label>
              <input
                type={typeof value === 'number' ? 'number' : 'text'}
                value={value as string | number}
                onChange={(e) => handleParamChange(key, e.target.value)}
              />
            </div>
          ))}
        </div>
      )}

      {selectedNode.inputs && Object.keys(selectedNode.inputs).length > 0 && (
        <div className="inspector-section">
          <h4>Inputs</h4>
          {Object.entries(selectedNode.inputs).map(([key, value]) => (
            <div key={key} className="inspector-field">
              <label>{key}</label>
              <div className="inspector-value">
                {value ? '✓ Connected' : '○ Disconnected'}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedNode.outputs && (
        <div className="inspector-section">
          <h4>Outputs</h4>
          {Object.entries(selectedNode.outputs).map(([key, value]) => (
            <div key={key} className="inspector-field">
              <label>{key}</label>
              <div className="inspector-value">
                {value ? '✓ Computed' : '⏳ Pending'}
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedNode.state && (
        <div className="inspector-section">
          <h4>State</h4>
          <div className="inspector-state">
            {selectedNode.state.error ? (
              <div className="error">❌ {selectedNode.state.error}</div>
            ) : selectedNode.dirty ? (
              <div className="warning">⚠️ Needs evaluation</div>
            ) : (
              <div className="success">✅ Ready</div>
            )}
          </div>
        </div>
      )}

      <div className="inspector-section">
        <h4>Position</h4>
        <div className="inspector-field">
          <label>X</label>
          <input
            type="number"
            value={Math.round(selectedNode.position?.x || 0)}
            readOnly
          />
        </div>
        <div className="inspector-field">
          <label>Y</label>
          <input
            type="number"
            value={Math.round(selectedNode.position?.y || 0)}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}