
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  fields: ScalarField[];
}
interface Outputs {
  field: ScalarField;
}

export const FieldMaxNode: NodeDefinition<FieldMaxInputs, FieldMaxOutputs, FieldMaxParams> = {
  type: 'Field::FieldMax',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldMax',
    description: 'Maximum of fields',
    
    
  },

  params: {
    
  },

  inputs: {
        fields: 'ScalarField[]'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldMax',
      params: {
        fields: inputs.fields
        
      }
    });

    return {
      field: result
    };
  }
};
