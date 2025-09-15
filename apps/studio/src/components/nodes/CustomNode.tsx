import React from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    label: string;
    type?: string;
  };
}

export function CustomNode({ data }: CustomNodeProps) {
  // Debug: Log when node renders
  console.log('🎨 NODE RENDERING:', data);

  return (
    <div className="custom-node" style={{
      padding: '12px',
      background: '#ffffff',
      border: '2px solid #e2e8f0',
      borderRadius: '8px',
      minWidth: '120px',
      textAlign: 'center',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      fontSize: '14px',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <div style={{
        fontWeight: '600',
        fontSize: '14px',
        marginBottom: '4px',
        color: '#1a202c'
      }}>
        {data.label || 'Unknown Node'}
      </div>
      {data.type && (
        <div style={{
          fontSize: '12px',
          color: '#718096',
          fontWeight: '400'
        }}>
          {data.type}
        </div>
      )}

      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{
          background: '#4a5568',
          border: '2px solid #ffffff',
          width: '10px',
          height: '10px'
        }}
      />

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{
          background: '#4a5568',
          border: '2px solid #ffffff',
          width: '10px',
          height: '10px'
        }}
      />
    </div>
  );
}

export default CustomNode;