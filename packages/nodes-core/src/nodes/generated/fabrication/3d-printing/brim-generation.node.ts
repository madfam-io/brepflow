
import { NodeDefinition } from '@brepflow/types';

interface Params {
  brimWidth: number;
  brimLines: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  brim: Wire[];
}

export const BrimGenerationNode: NodeDefinition<BrimGenerationInputs, BrimGenerationOutputs, BrimGenerationParams> = {
  type: 'Fabrication::BrimGeneration',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'BrimGeneration',
    description: 'Generate brim for adhesion',
    
    
  },

  params: {
        brimWidth: {
      "default": 10,
      "min": 1,
      "max": 50
    },
    brimLines: {
      "default": 20,
      "min": 1,
      "max": 100,
      "step": 1
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        brim: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'brimGeneration',
      params: {
        model: inputs.model,
        brimWidth: params.brimWidth,
        brimLines: params.brimLines
      }
    });

    return {
      brim: result
    };
  }
};
