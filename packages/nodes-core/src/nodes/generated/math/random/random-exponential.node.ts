
import { NodeDefinition } from '@brepflow/types';

interface Params {
  lambda: number;
  seed: number;
}
type Inputs = {};
interface Outputs {
  value: number;
}

export const RandomExponentialNode: NodeDefinition<RandomExponentialInputs, RandomExponentialOutputs, RandomExponentialParams> = {
  type: 'Math::RandomExponential',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'RandomExponential',
    description: 'Exponential distribution',
    
    
  },

  params: {
        lambda: {
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
      type: 'mathRandomExponential',
      params: {
        
        lambda: params.lambda,
        seed: params.seed
      }
    });

    return {
      value: result
    };
  }
};
