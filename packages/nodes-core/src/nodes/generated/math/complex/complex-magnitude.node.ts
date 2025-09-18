
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  complex: Complex;
}
interface Outputs {
  magnitude: number;
}

export const ComplexMagnitudeNode: NodeDefinition<ComplexMagnitudeInputs, ComplexMagnitudeOutputs, ComplexMagnitudeParams> = {
  type: 'Math::ComplexMagnitude',
  category: 'Math',
  subcategory: 'Complex',

  metadata: {
    label: 'ComplexMagnitude',
    description: 'Complex magnitude',
    
    
  },

  params: {
    
  },

  inputs: {
        complex: 'Complex'
  },

  outputs: {
        magnitude: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathComplexMagnitude',
      params: {
        complex: inputs.complex
        
      }
    });

    return {
      magnitude: result
    };
  }
};
