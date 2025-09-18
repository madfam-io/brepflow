
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: number;
  b: number;
}
interface Outputs {
  result: number;
}

export const AddNode: NodeDefinition<AddInputs, AddOutputs, AddParams> = {
  type: 'Math::Add',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Add',
    description: 'Add two numbers',
    
    
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
      type: 'mathAdd',
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
