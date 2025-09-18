
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: number;
  b: number;
}
interface Outputs {
  result: number;
}

export const SubtractNode: NodeDefinition<SubtractInputs, SubtractOutputs, SubtractParams> = {
  type: 'Math::Subtract',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Subtract',
    description: 'Subtract numbers',
    
    
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
      type: 'mathSubtract',
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
