import React from 'react';
import { Handle, Position } from 'reactflow';

interface CustomNodeProps {
  data: {
    label: string;
    type?: string;
  };
}

export function CustomNode({ data }: CustomNodeProps) {
  return (
    <div className="custom-node" style={{
      padding: '10px',
      background: '#fff',
      border: '2px solid #ddd',
      borderRadius: '8px',
      minWidth: '100px',
      textAlign: 'center',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '14px', marginBottom: '4px' }}>
        {data.label}
      </div>
      {data.type && (
        <div style={{ fontSize: '12px', color: '#666' }}>
          {data.type}
        </div>
      )}

      {/* Input handle */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ background: '#555' }}
      />

      {/* Output handle */}
      <Handle
        type="source"
        position={Position.Right}
        style={{ background: '#555' }}
      />
    </div>
  );
}

export default CustomNode;