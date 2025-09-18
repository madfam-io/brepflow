
import { NodeDefinition } from '@brepflow/types';

interface Params {
  octaves: number;
  persistence: number;
  seed: number;
}
interface Inputs {
  x: number;
  y?: number;
  z?: number;
}
interface Outputs {
  noise: number;
}

export const PerlinNoiseNode: NodeDefinition<PerlinNoiseInputs, PerlinNoiseOutputs, PerlinNoiseParams> = {
  type: 'Math::PerlinNoise',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'PerlinNoise',
    description: 'Perlin noise',
    
    
  },

  params: {
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
      "default": -1,
      "min": -1,
      "max": 999999
    }
  },

  inputs: {
        x: 'number',
    y: 'number',
    z: 'number'
  },

  outputs: {
        noise: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathPerlinNoise',
      params: {
        x: inputs.x,
        y: inputs.y,
        z: inputs.z,
        octaves: params.octaves,
        persistence: params.persistence,
        seed: params.seed
      }
    });

    return {
      noise: result
    };
  }
};
