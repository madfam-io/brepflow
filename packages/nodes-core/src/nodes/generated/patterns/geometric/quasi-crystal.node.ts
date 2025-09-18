
import { NodeDefinition } from '@brepflow/types';

interface Params {
  symmetry: number;
  waves: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  pattern: Wire[];
}

export const QuasiCrystalNode: NodeDefinition<QuasiCrystalInputs, QuasiCrystalOutputs, QuasiCrystalParams> = {
  type: 'Patterns::QuasiCrystal',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'QuasiCrystal',
    description: 'Quasicrystalline pattern',
    
    
  },

  params: {
        symmetry: {
      "default": 5,
      "min": 5,
      "max": 12,
      "step": 1
    },
    waves: {
      "default": 4,
      "min": 3,
      "max": 8,
      "step": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        pattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'quasiCrystal',
      params: {
        boundary: inputs.boundary,
        symmetry: params.symmetry,
        waves: params.waves
      }
    });

    return {
      pattern: result
    };
  }
};
