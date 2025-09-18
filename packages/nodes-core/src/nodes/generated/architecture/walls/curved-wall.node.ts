
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  thickness: number;
  segments: number;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  wall: Shape;
}

export const CurvedWallNode: NodeDefinition<CurvedWallInputs, CurvedWallOutputs, CurvedWallParams> = {
  type: 'Architecture::CurvedWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'CurvedWall',
    description: 'Create curved wall segment',
    
    
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
    segments: {
      "default": 10,
      "min": 3,
      "max": 50,
      "step": 1
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        wall: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curvedWall',
      params: {
        curve: inputs.curve,
        height: params.height,
        thickness: params.thickness,
        segments: params.segments
      }
    });

    return {
      wall: result
    };
  }
};
