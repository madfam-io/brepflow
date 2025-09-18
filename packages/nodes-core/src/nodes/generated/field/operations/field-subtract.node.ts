
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  fieldA: ScalarField;
  fieldB: ScalarField;
}
interface Outputs {
  field: ScalarField;
}

export const FieldSubtractNode: NodeDefinition<FieldSubtractInputs, FieldSubtractOutputs, FieldSubtractParams> = {
  type: 'Field::FieldSubtract',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldSubtract',
    description: 'Subtract fields',
    
    
  },

  params: {
    
  },

  inputs: {
        fieldA: 'ScalarField',
    fieldB: 'ScalarField'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldSubtract',
      params: {
        fieldA: inputs.fieldA,
        fieldB: inputs.fieldB
        
      }
    });

    return {
      field: result
    };
  }
};
