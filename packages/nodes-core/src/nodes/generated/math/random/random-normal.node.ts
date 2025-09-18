
import { NodeDefinition } from '@brepflow/types';

interface Params {
  mean: number;
  stddev: number;
  seed: number;
}
type Inputs = {};
interface Outputs {
  value: number;
}

export const RandomNormalNode: NodeDefinition<RandomNormalInputs, RandomNormalOutputs, RandomNormalParams> = {
  type: 'Math::RandomNormal',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'RandomNormal',
    description: 'Normal distribution',
    
    
  },

  params: {
        mean: {
      "default": 0
    },
    stddev: {
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
    
  },

  outputs: {
        value: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathRandomNormal',
      params: {
        
        mean: params.mean,
        stddev: params.stddev,
        seed: params.seed
      }
    });

    return {
      value: result
    };
  }
};
