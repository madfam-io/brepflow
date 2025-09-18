
import { NodeDefinition } from '@brepflow/types';

interface Params {
  seed: number;
}
type Inputs = {};
interface Outputs {
  value: number;
}

export const RandomNode: NodeDefinition<RandomInputs, RandomOutputs, RandomParams> = {
  type: 'Math::Random',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'Random',
    description: 'Random number 0-1',
    
    
  },

  params: {
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
      type: 'mathRandom',
      params: {
        
        seed: params.seed
      }
    });

    return {
      value: result
    };
  }
};
