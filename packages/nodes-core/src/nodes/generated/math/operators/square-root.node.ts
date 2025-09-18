
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const SquareRootNode: NodeDefinition<SquareRootInputs, SquareRootOutputs, SquareRootParams> = {
  type: 'Math::SquareRoot',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'SquareRoot',
    description: 'Square root',
    
    
  },

  params: {
    
  },

  inputs: {
        value: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathSqrt',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
