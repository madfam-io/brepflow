import { useState, useEffect, useMemo } from 'react';
import type { NodeDefinition } from '@brepflow/types';

// Temporary node metadata interface to replace missing types
interface NodeMetadata {
  label: string;
  description: string;
  category: string;
  tags: string[];
  complexity: 'beginner' | 'intermediate' | 'advanced';
}

// Enhanced fallback nodes with rich metadata for discovery
const ENHANCED_FALLBACK_NODES: Array<NodeDefinition & { metadata: NodeMetadata }> = [
  // Solid Operations
  {
    type: 'Solid::Box',
    category: 'Solid',
    inputs: {},
    outputs: { shape: 'Shape' },
    params: { width: 'number', height: 'number', depth: 'number' },
    metadata: {
      label: 'Box',
      description: 'Create a rectangular box with specified dimensions',
      category: 'Solid',
      tags: ['primitive', 'box', 'rectangle', 'cube'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Solid::Sphere',
    category: 'Solid',
    inputs: {},
    outputs: { shape: 'Shape' },
    params: { radius: 'number' },
    metadata: {
      label: 'Sphere',
      description: 'Create a sphere with specified radius',
      category: 'Solid',
      tags: ['primitive', 'sphere', 'ball', 'round'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Solid::Cylinder',
    category: 'Solid',
    inputs: {},
    outputs: { shape: 'Shape' },
    params: { radius: 'number', height: 'number' },
    metadata: {
      label: 'Cylinder',
      description: 'Create a cylinder with specified radius and height',
      category: 'Solid',
      tags: ['primitive', 'cylinder', 'tube', 'pipe'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Solid::Cone',
    category: 'Solid',
    inputs: {},
    outputs: { shape: 'Shape' },
    params: { radius: 'number', height: 'number' },
    metadata: {
      label: 'Cone',
      description: 'Create a cone with specified base radius and height',
      category: 'Solid',
      tags: ['primitive', 'cone', 'tapered'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Solid::Torus',
    category: 'Solid',
    inputs: {},
    outputs: { shape: 'Shape' },
    params: { majorRadius: 'number', minorRadius: 'number' },
    metadata: {
      label: 'Torus',
      description: 'Create a torus (donut shape) with major and minor radii',
      category: 'Solid',
      tags: ['primitive', 'torus', 'donut', 'ring'],
      complexity: 'intermediate'
    }
  },

  // Boolean Operations
  {
    type: 'Boolean::Union',
    category: 'Boolean',
    inputs: { a: 'Shape', b: 'Shape' },
    outputs: { result: 'Shape' },
    params: {},
    metadata: {
      label: 'Union',
      description: 'Combine two shapes into one by addition',
      category: 'Boolean',
      tags: ['boolean', 'union', 'add', 'combine'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Boolean::Difference',
    category: 'Boolean',
    inputs: { a: 'Shape', b: 'Shape' },
    outputs: { result: 'Shape' },
    params: {},
    metadata: {
      label: 'Difference',
      description: 'Subtract one shape from another',
      category: 'Boolean',
      tags: ['boolean', 'difference', 'subtract', 'cut'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Boolean::Intersection',
    category: 'Boolean',
    inputs: { a: 'Shape', b: 'Shape' },
    outputs: { result: 'Shape' },
    params: {},
    metadata: {
      label: 'Intersection',
      description: 'Keep only the overlapping parts of two shapes',
      category: 'Boolean',
      tags: ['boolean', 'intersection', 'overlap', 'common'],
      complexity: 'intermediate'
    }
  },

  // Transform Operations
  {
    type: 'Transform::Move',
    category: 'Transform',
    inputs: { shape: 'Shape' },
    outputs: { result: 'Shape' },
    params: { x: 'number', y: 'number', z: 'number' },
    metadata: {
      label: 'Move',
      description: 'Translate a shape by specified distances',
      category: 'Transform',
      tags: ['transform', 'move', 'translate', 'position'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Transform::Rotate',
    category: 'Transform',
    inputs: { shape: 'Shape' },
    outputs: { result: 'Shape' },
    params: { angle: 'number', axis: 'Vector3' },
    metadata: {
      label: 'Rotate',
      description: 'Rotate a shape around an axis by specified angle',
      category: 'Transform',
      tags: ['transform', 'rotate', 'turn', 'angle'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Transform::Scale',
    category: 'Transform',
    inputs: { shape: 'Shape' },
    outputs: { result: 'Shape' },
    params: { factor: 'number' },
    metadata: {
      label: 'Scale',
      description: 'Scale a shape by a uniform factor',
      category: 'Transform',
      tags: ['transform', 'scale', 'resize', 'size'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Transform::Mirror',
    category: 'Transform',
    inputs: { shape: 'Shape' },
    outputs: { result: 'Shape' },
    params: { plane: 'Plane' },
    metadata: {
      label: 'Mirror',
      description: 'Mirror a shape across a plane',
      category: 'Transform',
      tags: ['transform', 'mirror', 'reflect', 'flip'],
      complexity: 'intermediate'
    }
  },

  // Sketch Operations
  {
    type: 'Sketch::Line',
    category: 'Sketch',
    inputs: {},
    outputs: { curve: 'Wire' },
    params: { start: 'Point', end: 'Point' },
    metadata: {
      label: 'Line',
      description: 'Create a straight line between two points',
      category: 'Sketch',
      tags: ['sketch', 'line', 'straight', 'segment'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Sketch::Circle',
    category: 'Sketch',
    inputs: {},
    outputs: { curve: 'Wire' },
    params: { center: 'Point', radius: 'number' },
    metadata: {
      label: 'Circle',
      description: 'Create a circle with specified center and radius',
      category: 'Sketch',
      tags: ['sketch', 'circle', 'round', 'arc'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Sketch::Rectangle',
    category: 'Sketch',
    inputs: {},
    outputs: { curve: 'Wire' },
    params: { width: 'number', height: 'number' },
    metadata: {
      label: 'Rectangle',
      description: 'Create a rectangle with specified dimensions',
      category: 'Sketch',
      tags: ['sketch', 'rectangle', 'square', 'box'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Sketch::Arc',
    category: 'Sketch',
    inputs: {},
    outputs: { curve: 'Wire' },
    params: { center: 'Point', radius: 'number', startAngle: 'number', endAngle: 'number' },
    metadata: {
      label: 'Arc',
      description: 'Create an arc with specified center, radius and angles',
      category: 'Sketch',
      tags: ['sketch', 'arc', 'curve', 'partial'],
      complexity: 'intermediate'
    }
  },

  // Features
  {
    type: 'Features::Extrude',
    category: 'Features',
    inputs: { profile: 'Wire' },
    outputs: { shape: 'Shape' },
    params: { distance: 'number' },
    metadata: {
      label: 'Extrude',
      description: 'Extrude a 2D profile into a 3D shape',
      category: 'Features',
      tags: ['features', 'extrude', 'extend', 'push'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Features::Revolve',
    category: 'Features',
    inputs: { profile: 'Wire' },
    outputs: { shape: 'Shape' },
    params: { axis: 'Line', angle: 'number' },
    metadata: {
      label: 'Revolve',
      description: 'Revolve a 2D profile around an axis',
      category: 'Features',
      tags: ['features', 'revolve', 'rotate', 'lathe'],
      complexity: 'intermediate'
    }
  },
  {
    type: 'Features::Loft',
    category: 'Features',
    inputs: { profiles: 'Wire[]' },
    outputs: { shape: 'Shape' },
    params: {},
    metadata: {
      label: 'Loft',
      description: 'Create a shape by lofting between multiple profiles',
      category: 'Features',
      tags: ['features', 'loft', 'blend', 'transition'],
      complexity: 'advanced'
    }
  },
  {
    type: 'Features::Sweep',
    category: 'Features',
    inputs: { profile: 'Wire', path: 'Wire' },
    outputs: { shape: 'Shape' },
    params: {},
    metadata: {
      label: 'Sweep',
      description: 'Sweep a profile along a path to create a shape',
      category: 'Features',
      tags: ['features', 'sweep', 'follow', 'path'],
      complexity: 'advanced'
    }
  },

  // Fillets and Chamfers
  {
    type: 'Features::Fillet',
    category: 'Features',
    inputs: { shape: 'Shape', edges: 'Edge[]' },
    outputs: { result: 'Shape' },
    params: { radius: 'number' },
    metadata: {
      label: 'Fillet',
      description: 'Add rounded fillets to selected edges',
      category: 'Features',
      tags: ['features', 'fillet', 'round', 'smooth'],
      complexity: 'intermediate'
    }
  },
  {
    type: 'Features::Chamfer',
    category: 'Features',
    inputs: { shape: 'Shape', edges: 'Edge[]' },
    outputs: { result: 'Shape' },
    params: { distance: 'number' },
    metadata: {
      label: 'Chamfer',
      description: 'Add chamfers (beveled edges) to selected edges',
      category: 'Features',
      tags: ['features', 'chamfer', 'bevel', 'edge'],
      complexity: 'intermediate'
    }
  },

  // Analysis
  {
    type: 'Analysis::Volume',
    category: 'Analysis',
    inputs: { shape: 'Shape' },
    outputs: { volume: 'number' },
    params: {},
    metadata: {
      label: 'Volume',
      description: 'Calculate the volume of a 3D shape',
      category: 'Analysis',
      tags: ['analysis', 'volume', 'measure', 'calculate'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Analysis::Area',
    category: 'Analysis',
    inputs: { shape: 'Shape' },
    outputs: { area: 'number' },
    params: {},
    metadata: {
      label: 'Surface Area',
      description: 'Calculate the surface area of a shape',
      category: 'Analysis',
      tags: ['analysis', 'area', 'surface', 'measure'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Analysis::BoundingBox',
    category: 'Analysis',
    inputs: { shape: 'Shape' },
    outputs: { min: 'Point', max: 'Point', center: 'Point', dimensions: 'Vector3' },
    params: {},
    metadata: {
      label: 'Bounding Box',
      description: 'Calculate the axis-aligned bounding box of a shape',
      category: 'Analysis',
      tags: ['analysis', 'bounding', 'box', 'bounds'],
      complexity: 'beginner'
    }
  },

  // Data and Utilities
  {
    type: 'Data::Point',
    category: 'Data',
    inputs: {},
    outputs: { point: 'Point' },
    params: { x: 'number', y: 'number', z: 'number' },
    metadata: {
      label: 'Point',
      description: 'Create a 3D point with specified coordinates',
      category: 'Data',
      tags: ['data', 'point', 'coordinate', 'position'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Data::Vector',
    category: 'Data',
    inputs: {},
    outputs: { vector: 'Vector3' },
    params: { x: 'number', y: 'number', z: 'number' },
    metadata: {
      label: 'Vector',
      description: 'Create a 3D vector with specified components',
      category: 'Data',
      tags: ['data', 'vector', 'direction', 'normal'],
      complexity: 'beginner'
    }
  },
  {
    type: 'Data::Plane',
    category: 'Data',
    inputs: {},
    outputs: { plane: 'Plane' },
    params: { origin: 'Point', normal: 'Vector3' },
    metadata: {
      label: 'Plane',
      description: 'Create a plane with specified origin and normal vector',
      category: 'Data',
      tags: ['data', 'plane', 'surface', 'flat'],
      complexity: 'intermediate'
    }
  }
];

// Node discovery with graceful fallback and error handling
export function useResilientNodeDiscovery() {
  const [discoveredNodes, setDiscoveredNodes] = useState<Array<NodeDefinition & { metadata: NodeMetadata }>>([]);
  const [discoveryStatus, setDiscoveryStatus] = useState<'discovering' | 'fallback' | 'complete'>('discovering');
  const [errors, setErrors] = useState<string[]>([]);

  useEffect(() => {
    async function attemptNodeDiscovery() {
      const discoveryErrors: string[] = [];

      try {
        // Try to dynamically import the nodes-core package
        const { EnhancedNodeRegistry } = await import('@brepflow/nodes-core');

        if (EnhancedNodeRegistry && typeof EnhancedNodeRegistry.getAllNodes === 'function') {
          const dynamicNodes = EnhancedNodeRegistry.getAllNodes();

          if (dynamicNodes && dynamicNodes.length > 0) {
            // Success: use dynamic registry
            console.log(`✅ Successfully discovered ${dynamicNodes.length} nodes from registry`);
            setDiscoveredNodes(dynamicNodes);
            setDiscoveryStatus('complete');
            return;
          } else {
            discoveryErrors.push('Registry returned empty node list');
          }
        } else {
          discoveryErrors.push('EnhancedNodeRegistry not available or missing getAllNodes method');
        }
      } catch (error) {
        discoveryErrors.push(`Failed to import nodes-core: ${error instanceof Error ? error.message : String(error)}`);
      }

      // Fallback: use enhanced static nodes
      console.warn('⚠️ Falling back to static node definitions');
      console.log(`📦 Using ${ENHANCED_FALLBACK_NODES.length} fallback nodes with rich metadata`);

      setDiscoveredNodes(ENHANCED_FALLBACK_NODES);
      setDiscoveryStatus('fallback');
      setErrors(discoveryErrors);
    }

    attemptNodeDiscovery();
  }, []);

  // Build category tree from discovered nodes
  const categoryTree = useMemo(() => {
    const tree: Record<string, { nodes: any[], subcategories: Record<string, any[]> }> = {};

    discoveredNodes.forEach(node => {
      const category = node.metadata?.category || node.category || 'Other';

      if (!tree[category]) {
        tree[category] = { nodes: [], subcategories: {} };
      }

      tree[category].nodes.push(node);
    });

    return tree;
  }, [discoveredNodes]);

  // Search functionality with metadata
  const searchNodes = useMemo(() => {
    return (query: string) => {
      if (!query.trim()) return discoveredNodes;

      const lowerQuery = query.toLowerCase();

      return discoveredNodes.filter(node => {
        const metadata = node.metadata;
        const nodeType = node.type.toLowerCase();
        const label = metadata?.label?.toLowerCase() || '';
        const description = metadata?.description?.toLowerCase() || '';
        const tags = metadata?.tags?.join(' ').toLowerCase() || '';
        const category = metadata?.category?.toLowerCase() || node.category.toLowerCase();

        return nodeType.includes(lowerQuery) ||
               label.includes(lowerQuery) ||
               description.includes(lowerQuery) ||
               tags.includes(lowerQuery) ||
               category.includes(lowerQuery);
      });
    };
  }, [discoveredNodes]);

  return {
    nodes: discoveredNodes,
    categoryTree,
    searchNodes,
    discoveryStatus,
    errors,
    isReady: discoveryStatus !== 'discovering',
    nodeCount: discoveredNodes.length
  };
}