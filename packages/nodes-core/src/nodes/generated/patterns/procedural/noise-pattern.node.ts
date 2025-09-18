
import { NodeDefinition } from '@brepflow/types';

interface Params {
  noiseType: string;
  octaves: number;
  frequency: number;
  amplitude: number;
}
interface Inputs {
  domain: Box;
}
interface Outputs {
  noiseField: Data;
}

export const NoisePatternNode: NodeDefinition<NoisePatternInputs, NoisePatternOutputs, NoisePatternParams> = {
  type: 'Patterns::NoisePattern',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'NoisePattern',
    description: 'Procedural noise patterns',
    
    
  },

  params: {
        noiseType: {
      "default": "perlin",
      "options": [
        "perlin",
        "simplex",
        "worley",
        "value",
        "white"
      ]
    },
    octaves: {
      "default": 4,
      "min": 1,
      "max": 8,
      "step": 1
    },
    frequency: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    amplitude: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        domain: 'Box'
  },

  outputs: {
        noiseField: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'noisePattern',
      params: {
        domain: inputs.domain,
        noiseType: params.noiseType,
        octaves: params.octaves,
        frequency: params.frequency,
        amplitude: params.amplitude
      }
    });

    return {
      noiseField: result
    };
  }
};
