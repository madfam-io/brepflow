
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  maxDepth: number;
  leafSize: number;
}
interface Inputs {
  objects: Shape[];
}
interface Outputs {
  structure: Properties;
  stats: Properties;
  visualization: Wire[];
}

export const SpacePartitioningNode: NodeDefinition<SpacePartitioningInputs, SpacePartitioningOutputs, SpacePartitioningParams> = {
  type: 'Algorithmic::SpacePartitioning',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'SpacePartitioning',
    description: 'Spatial data structure for fast queries',
    
    
  },

  params: {
        type: {
      "default": "octree",
      "options": [
        "octree",
        "kdtree",
        "bvh"
      ]
    },
    maxDepth: {
      "default": 8,
      "min": 3,
      "max": 15
    },
    leafSize: {
      "default": 10,
      "min": 1,
      "max": 100
    }
  },

  inputs: {
        objects: 'Shape[]'
  },

  outputs: {
        structure: 'Properties',
    stats: 'Properties',
    visualization: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'spacePartitioning',
      params: {
        objects: inputs.objects,
        type: params.type,
        maxDepth: params.maxDepth,
        leafSize: params.leafSize
      }
    });

    return {
      structure: result,
      stats: result,
      visualization: result
    };
  }
};
