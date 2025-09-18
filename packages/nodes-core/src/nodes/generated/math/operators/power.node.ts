
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  base: number;
  exponent: number;
}
interface Outputs {
  result: number;
}

export const PowerNode: NodeDefinition<PowerInputs, PowerOutputs, PowerParams> = {
  type: 'Math::Power',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Power',
    description: 'Raise to power',
    
    
  },

  params: {
    
  },

  inputs: {
        base: 'number',
    exponent: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathPower',
      params: {
        base: inputs.base,
        exponent: inputs.exponent
        
      }
    });

    return {
      result: result
    };
  }
};
