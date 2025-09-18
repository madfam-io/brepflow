
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  coping: boolean;
  copingOverhang: number;
}
interface Inputs {
  roofEdge: Wire;
}
interface Outputs {
  parapet: Shape;
}

export const ParapetWallNode: NodeDefinition<ParapetWallInputs, ParapetWallOutputs, ParapetWallParams> = {
  type: 'Architecture::ParapetWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'ParapetWall',
    description: 'Roof parapet wall',
    
    
  },

  params: {
        height: {
      "default": 1000,
      "min": 300,
      "max": 2000
    },
    coping: {
      "default": true
    },
    copingOverhang: {
      "default": 50,
      "min": 0,
      "max": 150
    }
  },

  inputs: {
        roofEdge: 'Wire'
  },

  outputs: {
        parapet: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'parapetWall',
      params: {
        roofEdge: inputs.roofEdge,
        height: params.height,
        coping: params.coping,
        copingOverhang: params.copingOverhang
      }
    });

    return {
      parapet: result
    };
  }
};
