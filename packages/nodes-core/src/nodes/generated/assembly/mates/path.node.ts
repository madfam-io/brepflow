
import { NodeDefinition } from '@brepflow/types';

interface Params {
  position: number;
  tangent: boolean;
}
interface Inputs {
  path: Wire;
  follower: Shape;
}
interface Outputs {
  pathed: Shape[];
  mate: Mate;
}

export const PathNode: NodeDefinition<PathInputs, PathOutputs, PathParams> = {
  type: 'Assembly::Path',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'Path',
    description: 'Constrain to path',
    
    
  },

  params: {
        position: {
      "default": 0,
      "min": 0,
      "max": 1
    },
    tangent: {
      "default": true
    }
  },

  inputs: {
        path: 'Wire',
    follower: 'Shape'
  },

  outputs: {
        pathed: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'matePath',
      params: {
        path: inputs.path,
        follower: inputs.follower,
        position: params.position,
        tangent: params.tangent
      }
    });

    return {
      pathed: result,
      mate: result
    };
  }
};
