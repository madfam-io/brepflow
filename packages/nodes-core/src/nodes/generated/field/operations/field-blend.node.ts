
import { NodeDefinition } from '@brepflow/types';

interface Params {
  mode: string;
}
interface Inputs {
  fieldA: ScalarField;
  fieldB: ScalarField;
  factor: number;
}
interface Outputs {
  field: ScalarField;
}

export const FieldBlendNode: NodeDefinition<FieldBlendInputs, FieldBlendOutputs, FieldBlendParams> = {
  type: 'Field::FieldBlend',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldBlend',
    description: 'Blend fields',
    
    
  },

  params: {
        mode: {
      "default": "linear",
      "options": [
        "linear",
        "smooth",
        "overlay",
        "multiply"
      ]
    }
  },

  inputs: {
        fieldA: 'ScalarField',
    fieldB: 'ScalarField',
    factor: 'number'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldBlend',
      params: {
        fieldA: inputs.fieldA,
        fieldB: inputs.fieldB,
        factor: inputs.factor,
        mode: params.mode
      }
    });

    return {
      field: result
    };
  }
};
