
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  fieldA: ScalarField;
  fieldB: ScalarField;
}
interface Outputs {
  field: ScalarField;
}

export const FieldAddNode: NodeDefinition<FieldAddInputs, FieldAddOutputs, FieldAddParams> = {
  type: 'Field::FieldAdd',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldAdd',
    description: 'Add fields',
    
    
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
      type: 'fieldAdd',
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
