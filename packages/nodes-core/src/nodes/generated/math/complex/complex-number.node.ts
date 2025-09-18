
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  real: number;
  imaginary: number;
}
interface Outputs {
  complex: Complex;
}

export const ComplexNumberNode: NodeDefinition<ComplexNumberInputs, ComplexNumberOutputs, ComplexNumberParams> = {
  type: 'Math::ComplexNumber',
  category: 'Math',
  subcategory: 'Complex',

  metadata: {
    label: 'ComplexNumber',
    description: 'Create complex number',
    
    
  },

  params: {
    
  },

  inputs: {
        real: 'number',
    imaginary: 'number'
  },

  outputs: {
        complex: 'Complex'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathComplex',
      params: {
        real: inputs.real,
        imaginary: inputs.imaginary
        
      }
    });

    return {
      complex: result
    };
  }
};
