
import { NodeDefinition } from '@brepflow/types';

interface Params {
  scale: number;
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

export const SimplexNoiseNode: NodeDefinition<SimplexNoiseInputs, SimplexNoiseOutputs, SimplexNoiseParams> = {
  type: 'Math::SimplexNoise',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'SimplexNoise',
    description: 'Simplex noise',
    
    
  },

  params: {
        scale: {
      "default": 1,
      "min": 0.01
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
      type: 'mathSimplexNoise',
      params: {
        x: inputs.x,
        y: inputs.y,
        z: inputs.z,
        scale: params.scale,
        seed: params.seed
      }
    });

    return {
      noise: result
    };
  }
};
