
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: number;
  b: number;
}
interface Outputs {
  result: number;
}

export const DivideNode: NodeDefinition<DivideInputs, DivideOutputs, DivideParams> = {
  type: 'Math::Divide',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Divide',
    description: 'Divide numbers',
    
    
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
      type: 'mathDivide',
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
