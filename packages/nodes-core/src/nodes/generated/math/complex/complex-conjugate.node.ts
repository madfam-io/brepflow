
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  complex: Complex;
}
interface Outputs {
  conjugate: Complex;
}

export const ComplexConjugateNode: NodeDefinition<ComplexConjugateInputs, ComplexConjugateOutputs, ComplexConjugateParams> = {
  type: 'Math::ComplexConjugate',
  category: 'Math',
  subcategory: 'Complex',

  metadata: {
    label: 'ComplexConjugate',
    description: 'Complex conjugate',
    
    
  },

  params: {
    
  },

  inputs: {
        complex: 'Complex'
  },

  outputs: {
        conjugate: 'Complex'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathComplexConjugate',
      params: {
        complex: inputs.complex
        
      }
    });

    return {
      conjugate: result
    };
  }
};
