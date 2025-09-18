
import { NodeDefinition } from '@brepflow/types';

interface Params {
  kernelSize: number;
}
interface Inputs {
  field?: Field;
  kernel: Field;
}
interface Outputs {
  convolvedField: Field;
}

export const FieldConvolutionNode: NodeDefinition<FieldConvolutionInputs, FieldConvolutionOutputs, FieldConvolutionParams> = {
  type: 'Fields::FieldConvolution',
  category: 'Fields',
  subcategory: 'Advanced',

  metadata: {
    label: 'FieldConvolution',
    description: 'Convolve field with kernel',
    
    
  },

  params: {
        kernelSize: {
      "default": 3,
      "min": 3,
      "max": 11,
      "step": 2,
      "description": "Kernel size (odd number)"
    }
  },

  inputs: {
        field: 'Field',
    kernel: 'Field'
  },

  outputs: {
        convolvedField: 'Field'
  },

  async evaluate(context, inputs, params) {
    
    // TODO: Implement FieldConvolution logic
    throw new Error('FieldConvolution not yet implemented');
  }
};
