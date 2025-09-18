
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  n: number;
}
interface Outputs {
  result: number;
}

export const FactorialNode: NodeDefinition<FactorialInputs, FactorialOutputs, FactorialParams> = {
  type: 'Math::Factorial',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Factorial',
    description: 'Factorial',
    
    
  },

  params: {
    
  },

  inputs: {
        n: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathFactorial',
      params: {
        n: inputs.n
        
      }
    });

    return {
      result: result
    };
  }
};
