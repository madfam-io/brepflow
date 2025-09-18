
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: Complex;
  b: Complex;
}
interface Outputs {
  result: Complex;
}

export const ComplexAddNode: NodeDefinition<ComplexAddInputs, ComplexAddOutputs, ComplexAddParams> = {
  type: 'Math::ComplexAdd',
  category: 'Math',
  subcategory: 'Complex',

  metadata: {
    label: 'ComplexAdd',
    description: 'Add complex numbers',
    
    
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
      type: 'mathComplexAdd',
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
