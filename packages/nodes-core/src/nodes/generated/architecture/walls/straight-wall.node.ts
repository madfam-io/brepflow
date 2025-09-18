
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  thickness: number;
  justification: string;
}
interface Inputs {
  centerline: Wire;
}
interface Outputs {
  wall: Shape;
  centerline: Wire;
}

export const StraightWallNode: NodeDefinition<StraightWallInputs, StraightWallOutputs, StraightWallParams> = {
  type: 'Architecture::StraightWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'StraightWall',
    description: 'Create straight wall segment',
    
    
  },

  params: {
        height: {
      "default": 3000,
      "min": 100,
      "max": 10000
    },
    thickness: {
      "default": 200,
      "min": 50,
      "max": 500
    },
    justification: {
      "default": "center",
      "options": [
        "center",
        "left",
        "right"
      ]
    }
  },

  inputs: {
        centerline: 'Wire'
  },

  outputs: {
        wall: 'Shape',
    centerline: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'straightWall',
      params: {
        centerline: inputs.centerline,
        height: params.height,
        thickness: params.thickness,
        justification: params.justification
      }
    });

    return {
      wall: result,
      centerline: result
    };
  }
};
