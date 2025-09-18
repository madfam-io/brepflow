
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  subdivisions: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  tiles: Face[];
}

export const PenroseTilingNode: NodeDefinition<PenroseTilingInputs, PenroseTilingOutputs, PenroseTilingParams> = {
  type: 'Patterns::PenroseTiling',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'PenroseTiling',
    description: 'Penrose aperiodic tiling',
    
    
  },

  params: {
        type: {
      "default": "P2",
      "options": [
        "P1",
        "P2",
        "P3"
      ]
    },
    subdivisions: {
      "default": 5,
      "min": 1,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        tiles: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'penroseTiling',
      params: {
        boundary: inputs.boundary,
        type: params.type,
        subdivisions: params.subdivisions
      }
    });

    return {
      tiles: result
    };
  }
};
