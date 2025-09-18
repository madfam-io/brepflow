
import { NodeDefinition } from '@brepflow/types';

interface Params {
  power: number;
}
interface Inputs {
  t: number;
}
interface Outputs {
  result: number;
}

export const EaseInNode: NodeDefinition<EaseInInputs, EaseInOutputs, EaseInParams> = {
  type: 'Math::EaseIn',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'EaseIn',
    description: 'Ease in curve',
    
    
  },

  params: {
        power: {
      "default": 2,
      "min": 1,
      "max": 10
    }
  },

  inputs: {
        t: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathEaseIn',
      params: {
        t: inputs.t,
        power: params.power
      }
    });

    return {
      result: result
    };
  }
};
