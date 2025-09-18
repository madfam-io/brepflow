
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  fields: ScalarField[];
}
interface Outputs {
  field: ScalarField;
}

export const FieldMinNode: NodeDefinition<FieldMinInputs, FieldMinOutputs, FieldMinParams> = {
  type: 'Field::FieldMin',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldMin',
    description: 'Minimum of fields',
    
    
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
      type: 'fieldMin',
      params: {
        fields: inputs.fields
        
      }
    });

    return {
      field: result
    };
  }
};
