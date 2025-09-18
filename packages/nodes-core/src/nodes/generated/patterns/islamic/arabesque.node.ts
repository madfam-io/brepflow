
import { NodeDefinition } from '@brepflow/types';

interface Params {
  complexity: number;
  symmetry: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  pattern: Wire[];
}

export const ArabesqueNode: NodeDefinition<ArabesqueInputs, ArabesqueOutputs, ArabesqueParams> = {
  type: 'Patterns::Arabesque',
  category: 'Patterns',
  subcategory: 'Islamic',

  metadata: {
    label: 'Arabesque',
    description: 'Arabesque pattern',
    
    
  },

  params: {
        complexity: {
      "default": 3,
      "min": 1,
      "max": 5,
      "step": 1
    },
    symmetry: {
      "default": 6,
      "min": 3,
      "max": 12,
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
      type: 'arabesque',
      params: {
        boundary: inputs.boundary,
        complexity: params.complexity,
        symmetry: params.symmetry
      }
    });

    return {
      pattern: result
    };
  }
};
