
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  inverted: ScalarField;
}

export const FieldInvertNode: NodeDefinition<FieldInvertInputs, FieldInvertOutputs, FieldInvertParams> = {
  type: 'Field::FieldInvert',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldInvert',
    description: 'Invert field values',
    
    
  },

  params: {
    
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        inverted: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldInvert',
      params: {
        field: inputs.field
        
      }
    });

    return {
      inverted: result
    };
  }
};
