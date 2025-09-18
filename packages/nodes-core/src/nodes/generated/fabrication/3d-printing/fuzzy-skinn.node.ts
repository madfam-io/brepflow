
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  pointDistance: number;
}
interface Inputs {
  perimeters: Wire[];
}
interface Outputs {
  fuzzyPerimeters: Wire[];
}

export const FuzzySkinnNode: NodeDefinition<FuzzySkinnInputs, FuzzySkinnOutputs, FuzzySkinnParams> = {
  type: 'Fabrication::FuzzySkinn',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'FuzzySkinn',
    description: 'Generate fuzzy skin texture',
    
    
  },

  params: {
        thickness: {
      "default": 0.3,
      "min": 0.1,
      "max": 1
    },
    pointDistance: {
      "default": 0.75,
      "min": 0.1,
      "max": 2
    }
  },

  inputs: {
        perimeters: 'Wire[]'
  },

  outputs: {
        fuzzyPerimeters: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fuzzySkin',
      params: {
        perimeters: inputs.perimeters,
        thickness: params.thickness,
        pointDistance: params.pointDistance
      }
    });

    return {
      fuzzyPerimeters: result
    };
  }
};
