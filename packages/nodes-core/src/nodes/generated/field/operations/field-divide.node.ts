
import { NodeDefinition } from '@brepflow/types';

interface Params {
  epsilon: number;
}
interface Inputs {
  fieldA: ScalarField;
  fieldB: ScalarField;
}
interface Outputs {
  field: ScalarField;
}

export const FieldDivideNode: NodeDefinition<FieldDivideInputs, FieldDivideOutputs, FieldDivideParams> = {
  type: 'Field::FieldDivide',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldDivide',
    description: 'Divide fields',
    
    
  },

  params: {
        epsilon: {
      "default": 0.001,
      "min": 0
    }
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
      type: 'fieldDivide',
      params: {
        fieldA: inputs.fieldA,
        fieldB: inputs.fieldB,
        epsilon: params.epsilon
      }
    });

    return {
      field: result
    };
  }
};
