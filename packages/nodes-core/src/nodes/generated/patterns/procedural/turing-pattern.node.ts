
import { NodeDefinition } from '@brepflow/types';

interface Params {
  model: string;
  iterations: number;
  resolution: number;
}
interface Inputs {
  domain: Face;
}
interface Outputs {
  pattern: Mesh;
}

export const TuringPatternNode: NodeDefinition<TuringPatternInputs, TuringPatternOutputs, TuringPatternParams> = {
  type: 'Patterns::TuringPattern',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'TuringPattern',
    description: 'Turing reaction-diffusion',
    
    
  },

  params: {
        model: {
      "default": "gray-scott",
      "options": [
        "gray-scott",
        "gierer-meinhardt",
        "brusselator"
      ]
    },
    iterations: {
      "default": 1000,
      "min": 100,
      "max": 10000,
      "step": 100
    },
    resolution: {
      "default": 100,
      "min": 50,
      "max": 500,
      "step": 10
    }
  },

  inputs: {
        domain: 'Face'
  },

  outputs: {
        pattern: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'turingPattern',
      params: {
        domain: inputs.domain,
        model: params.model,
        iterations: params.iterations,
        resolution: params.resolution
      }
    });

    return {
      pattern: result
    };
  }
};
