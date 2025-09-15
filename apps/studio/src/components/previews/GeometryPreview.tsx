import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { StatusIcon } from '../icons/IconSystem';
import type { NodeInstance } from '@brepflow/types';

interface GeometryPreviewProps {
  node: NodeInstance;
  size?: number;
}

interface PreviewMeshProps {
  geometry: THREE.BufferGeometry;
  material: THREE.Material;
}

const PreviewMesh: React.FC<PreviewMeshProps> = ({ geometry, material }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.005;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return <mesh ref={meshRef} geometry={geometry} material={material} />;
};

const generateMockGeometry = (nodeType: string): THREE.BufferGeometry => {
  const type = nodeType.split('::')[1];

  switch (type) {
    case 'Box':
      return new THREE.BoxGeometry(1, 1, 1);

    case 'Cylinder':
      return new THREE.CylinderGeometry(0.5, 0.5, 1, 16);

    case 'Sphere':
      return new THREE.SphereGeometry(0.6, 16, 12);

    case 'Circle':
      return new THREE.RingGeometry(0.3, 0.5, 16);

    case 'Extrude':
      // Create an extruded shape
      const shape = new THREE.Shape();
      shape.moveTo(-0.5, -0.5);
      shape.lineTo(0.5, -0.5);
      shape.lineTo(0.5, 0.5);
      shape.lineTo(-0.5, 0.5);
      shape.lineTo(-0.5, -0.5);

      return new THREE.ExtrudeGeometry(shape, {
        depth: 0.5,
        bevelEnabled: false
      });

    case 'Union':
    case 'Boolean':
      // Complex shape representing boolean operation
      return new THREE.TorusGeometry(0.4, 0.2, 8, 16);

    default:
      // Default to a simple box
      return new THREE.BoxGeometry(0.8, 0.8, 0.8);
  }
};

export const GeometryPreview: React.FC<GeometryPreviewProps> = ({
  node,
  size = 64
}) => {
  const [geometry, setGeometry] = useState<THREE.BufferGeometry | null>(null);
  const [material, setMaterial] = useState<THREE.Material | null>(null);
  const [status, setStatus] = useState<'computing' | 'success' | 'error'>('computing');

  useEffect(() => {
    // Simulate geometry computation
    const computeGeometry = async () => {
      setStatus('computing');

      // Simulate computation delay
      await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

      try {
        const geom = generateMockGeometry(node.type);
        const mat = new THREE.MeshStandardMaterial({
          color: node.state?.error ? '#ef4444' : '#3b82f6',
          metalness: 0.1,
          roughness: 0.3,
          transparent: true,
          opacity: 0.8
        });

        setGeometry(geom);
        setMaterial(mat);
        setStatus(node.state?.error ? 'error' : 'success');
      } catch (error) {
        setStatus('error');
      }
    };

    computeGeometry();

    // Cleanup
    return () => {
      geometry?.dispose();
      material?.dispose();
    };
  }, [node.type, node.params, node.state?.error]);

  if (status === 'computing') {
    return (
      <div
        className="geometry-preview computing"
        style={{ width: size, height: size }}
      >
        <StatusIcon status="computing" size={16} />
      </div>
    );
  }

  if (status === 'error' || !geometry || !material) {
    return (
      <div
        className="geometry-preview error"
        style={{ width: size, height: size }}
      >
        <StatusIcon status="error" size={16} />
      </div>
    );
  }

  return (
    <div
      className="geometry-preview success"
      style={{ width: size, height: size }}
    >
      <Canvas
        camera={{ position: [2, 2, 2], fov: 50 }}
        style={{ width: '100%', height: '100%' }}
      >
        <ambientLight intensity={0.4} />
        <directionalLight position={[1, 1, 1]} intensity={0.8} />
        <PreviewMesh geometry={geometry} material={material} />
      </Canvas>

      <div className="preview-overlay">
        <StatusIcon status="success" size={12} />
      </div>
    </div>
  );
};

// CSS styles for the geometry preview
export const GeometryPreviewStyles = `
  .geometry-preview {
    border-radius: var(--radius-md);
    border: 1px solid var(--border);
    background: var(--bg-secondary);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .geometry-preview.computing {
    background: var(--bg-tertiary);
    animation: pulse 1.5s ease-in-out infinite;
  }

  .geometry-preview.error {
    background: rgba(239, 68, 68, 0.1);
    border-color: var(--error);
  }

  .geometry-preview.success canvas {
    border-radius: var(--radius-md);
  }

  .preview-overlay {
    position: absolute;
    top: 4px;
    right: 4px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: var(--radius-sm);
    padding: 2px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .preview-overlay .status-icon {
    color: white;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }
`;

// Hook to get preview for a node
export const useNodePreview = (node: NodeInstance) => {
  const [previewData, setPreviewData] = useState<{
    thumbnail?: string;
    status: 'computing' | 'success' | 'error';
    executionTime?: number;
  }>({
    status: 'computing'
  });

  useEffect(() => {
    const computePreview = async () => {
      const startTime = Date.now();
      setPreviewData({ status: 'computing' });

      // Simulate computation
      await new Promise(resolve => setTimeout(resolve, 100 + Math.random() * 200));

      const executionTime = Date.now() - startTime;

      if (node.state?.error) {
        setPreviewData({
          status: 'error',
          executionTime
        });
      } else {
        setPreviewData({
          status: 'success',
          executionTime,
          thumbnail: `data:image/svg+xml,${encodeURIComponent(`
            <svg width="64" height="64" xmlns="http://www.w3.org/2000/svg">
              <rect width="64" height="64" fill="#f1f5f9"/>
              <rect x="16" y="16" width="32" height="32" fill="#3b82f6" opacity="0.7"/>
              <text x="32" y="52" text-anchor="middle" font-size="8" fill="#64748b">
                ${node.type.split('::')[1]}
              </text>
            </svg>
          `)}`
        });
      }
    };

    computePreview();
  }, [node.type, node.params, node.state?.error]);

  return previewData;
};