
import { NodeDefinition } from '@brepflow/types';

interface Params {
  seed: number;
}
interface Inputs {
  min: number;
  max: number;
}
interface Outputs {
  value: number;
}

export const RandomRangeNode: NodeDefinition<RandomRangeInputs, RandomRangeOutputs, RandomRangeParams> = {
  type: 'Math::RandomRange',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'RandomRange',
    description: 'Random in range',
    
    
  },

  params: {
        seed: {
      "default": -1,
      "min": -1,
      "max": 999999
    }
  },

  inputs: {
        min: 'number',
    max: 'number'
  },

  outputs: {
        value: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathRandomRange',
      params: {
        min: inputs.min,
        max: inputs.max,
        seed: params.seed
      }
    });

    return {
      value: result
    };
  }
};
