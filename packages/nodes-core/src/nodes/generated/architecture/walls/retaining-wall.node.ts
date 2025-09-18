
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  baseThickness: number;
  batter: number;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  retainingWall: Shape;
}

export const RetainingWallNode: NodeDefinition<RetainingWallInputs, RetainingWallOutputs, RetainingWallParams> = {
  type: 'Architecture::RetainingWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'RetainingWall',
    description: 'Retaining wall with batter',
    
    
  },

  params: {
        height: {
      "default": 2000,
      "min": 500,
      "max": 6000
    },
    baseThickness: {
      "default": 400,
      "min": 200,
      "max": 1000
    },
    batter: {
      "default": 10,
      "min": 0,
      "max": 30
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        retainingWall: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'retainingWall',
      params: {
        path: inputs.path,
        height: params.height,
        baseThickness: params.baseThickness,
        batter: params.batter
      }
    });

    return {
      retainingWall: result
    };
  }
};
