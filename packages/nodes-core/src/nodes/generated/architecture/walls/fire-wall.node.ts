
import { NodeDefinition } from '@brepflow/types';

interface Params {
  fireRating: string;
  thickness: number;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  fireWall: Shape;
}

export const FireWallNode: NodeDefinition<FireWallInputs, FireWallOutputs, FireWallParams> = {
  type: 'Architecture::FireWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'FireWall',
    description: 'Fire-rated wall assembly',
    
    
  },

  params: {
        fireRating: {
      "default": "2-hour",
      "options": [
        "1-hour",
        "2-hour",
        "3-hour",
        "4-hour"
      ]
    },
    thickness: {
      "default": 250,
      "min": 200,
      "max": 400
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        fireWall: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fireWall',
      params: {
        path: inputs.path,
        fireRating: params.fireRating,
        thickness: params.thickness
      }
    });

    return {
      fireWall: result
    };
  }
};
