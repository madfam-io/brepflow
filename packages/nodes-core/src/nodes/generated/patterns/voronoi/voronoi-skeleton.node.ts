
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pruning: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  skeleton: Wire[];
}

export const VoronoiSkeletonNode: NodeDefinition<VoronoiSkeletonInputs, VoronoiSkeletonOutputs, VoronoiSkeletonParams> = {
  type: 'Patterns::VoronoiSkeleton',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'VoronoiSkeleton',
    description: 'Medial axis from Voronoi',
    
    
  },

  params: {
        pruning: {
      "default": 0.1,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        skeleton: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiSkeleton',
      params: {
        boundary: inputs.boundary,
        pruning: params.pruning
      }
    });

    return {
      skeleton: result
    };
  }
};
