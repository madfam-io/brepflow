
import { NodeDefinition } from '@brepflow/types';

interface Params {
  decimals: number;
}
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const RoundToDecimalNode: NodeDefinition<RoundToDecimalInputs, RoundToDecimalOutputs, RoundToDecimalParams> = {
  type: 'Math::RoundToDecimal',
  category: 'Math',
  subcategory: 'Rounding',

  metadata: {
    label: 'RoundToDecimal',
    description: 'Round to decimal places',
    
    
  },

  params: {
        decimals: {
      "default": 2,
      "min": 0,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        value: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathRoundDecimal',
      params: {
        value: inputs.value,
        decimals: params.decimals
      }
    });

    return {
      result: result
    };
  }
};
