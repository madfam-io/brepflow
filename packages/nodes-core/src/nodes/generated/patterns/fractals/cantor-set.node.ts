
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
  ratio: number;
}
interface Inputs {
  segment: Edge;
}
interface Outputs {
  segments: Edge[];
}

export const CantorSetNode: NodeDefinition<CantorSetInputs, CantorSetOutputs, CantorSetParams> = {
  type: 'Patterns::CantorSet',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'CantorSet',
    description: 'Cantor set fractal',
    
    
  },

  params: {
        iterations: {
      "default": 5,
      "min": 1,
      "max": 10,
      "step": 1
    },
    ratio: {
      "default": 0.333,
      "min": 0.1,
      "max": 0.5
    }
  },

  inputs: {
        segment: 'Edge'
  },

  outputs: {
        segments: 'Edge[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'cantorSet',
      params: {
        segment: inputs.segment,
        iterations: params.iterations,
        ratio: params.ratio
      }
    });

    return {
      segments: result
    };
  }
};
