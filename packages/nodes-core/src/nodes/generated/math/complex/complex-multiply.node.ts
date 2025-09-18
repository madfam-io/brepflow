
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: Complex;
  b: Complex;
}
interface Outputs {
  result: Complex;
}

export const ComplexMultiplyNode: NodeDefinition<ComplexMultiplyInputs, ComplexMultiplyOutputs, ComplexMultiplyParams> = {
  type: 'Math::ComplexMultiply',
  category: 'Math',
  subcategory: 'Complex',

  metadata: {
    label: 'ComplexMultiply',
    description: 'Multiply complex numbers',
    
    
  },

  params: {
    
  },

  inputs: {
        a: 'Complex',
    b: 'Complex'
  },

  outputs: {
        result: 'Complex'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathComplexMultiply',
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
