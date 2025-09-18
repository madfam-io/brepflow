
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

export const EaseInOutNode: NodeDefinition<EaseInOutInputs, EaseInOutOutputs, EaseInOutParams> = {
  type: 'Math::EaseInOut',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'EaseInOut',
    description: 'Ease in-out curve',
    
    
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
      type: 'mathEaseInOut',
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
