
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  scale: number;
  octaves: number;
  persistence: number;
  seed: number;
}
interface Inputs {
  domain: Box;
}
interface Outputs {
  field: ScalarField;
}

export const NoiseFieldNode: NodeDefinition<NoiseFieldInputs, NoiseFieldOutputs, NoiseFieldParams> = {
  type: 'Field::NoiseField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'NoiseField',
    description: 'Noise-based field',
    
    
  },

  params: {
        type: {
      "default": "perlin",
      "options": [
        "perlin",
        "simplex",
        "worley",
        "turbulence"
      ]
    },
    scale: {
      "default": 10,
      "min": 0.1
    },
    octaves: {
      "default": 4,
      "min": 1,
      "max": 8,
      "step": 1
    },
    persistence: {
      "default": 0.5,
      "min": 0,
      "max": 1
    },
    seed: {
      "default": 0,
      "min": 0,
      "max": 999999
    }
  },

  inputs: {
        domain: 'Box'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldNoise',
      params: {
        domain: inputs.domain,
        type: params.type,
        scale: params.scale,
        octaves: params.octaves,
        persistence: params.persistence,
        seed: params.seed
      }
    });

    return {
      field: result
    };
  }
};
