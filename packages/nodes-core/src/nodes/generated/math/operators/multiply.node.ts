
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: number;
  b: number;
}
interface Outputs {
  result: number;
}

export const MultiplyNode: NodeDefinition<MultiplyInputs, MultiplyOutputs, MultiplyParams> = {
  type: 'Math::Multiply',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Multiply',
    description: 'Multiply numbers',
    
    
  },

  params: {
    
  },

  inputs: {
        a: 'number',
    b: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMultiply',
      params: {
        a: inputs.a,
        b: inputs.b
        
      }
    });

    return {
      result: result
    };
  }
};
