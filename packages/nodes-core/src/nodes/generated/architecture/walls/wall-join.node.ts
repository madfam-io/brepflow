
import { NodeDefinition } from '@brepflow/types';

interface Params {
  joinType: string;
}
interface Inputs {
  wall1: Shape;
  wall2: Shape;
}
interface Outputs {
  joinedWalls: Shape;
}

export const WallJoinNode: NodeDefinition<WallJoinInputs, WallJoinOutputs, WallJoinParams> = {
  type: 'Architecture::WallJoin',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'WallJoin',
    description: 'Join wall segments',
    
    
  },

  params: {
        joinType: {
      "default": "miter",
      "options": [
        "miter",
        "butt",
        "overlap"
      ]
    }
  },

  inputs: {
        wall1: 'Shape',
    wall2: 'Shape'
  },

  outputs: {
        joinedWalls: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'wallJoin',
      params: {
        wall1: inputs.wall1,
        wall2: inputs.wall2,
        joinType: params.joinType
      }
    });

    return {
      joinedWalls: result
    };
  }
};
