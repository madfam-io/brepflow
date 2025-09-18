
import { NodeDefinition } from '@brepflow/types';

interface Params {
  resolution: number;
  pruning: number;
  simplify: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  skeleton: Wire[];
  branchPoints: Point[];
  endpoints: Point[];
}

export const MedialAxisNode: NodeDefinition<MedialAxisInputs, MedialAxisOutputs, MedialAxisParams> = {
  type: 'Algorithmic::MedialAxis',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'MedialAxis',
    description: 'Compute medial axis/skeleton',
    
    
  },

  params: {
        resolution: {
      "default": 0.1,
      "min": 0.01,
      "max": 1
    },
    pruning: {
      "default": 0.1,
      "min": 0,
      "max": 1
    },
    simplify: {
      "default": true
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        skeleton: 'Wire[]',
    branchPoints: 'Point[]',
    endpoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'medialAxis',
      params: {
        shape: inputs.shape,
        resolution: params.resolution,
        pruning: params.pruning,
        simplify: params.simplify
      }
    });

    return {
      skeleton: result,
      branchPoints: result,
      endpoints: result
    };
  }
};
