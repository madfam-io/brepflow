
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  fieldA: ScalarField;
  fieldB: ScalarField;
}
interface Outputs {
  field: ScalarField;
}

export const FieldMultiplyNode: NodeDefinition<FieldMultiplyInputs, FieldMultiplyOutputs, FieldMultiplyParams> = {
  type: 'Field::FieldMultiply',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldMultiply',
    description: 'Multiply fields',
    
    
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
      type: 'fieldMultiply',
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
