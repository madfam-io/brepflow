
import { NodeDefinition } from '@brepflow/types';

interface Params {
  min: number;
  max: number;
}
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  clamped: ScalarField;
}

export const FieldClampNode: NodeDefinition<FieldClampInputs, FieldClampOutputs, FieldClampParams> = {
  type: 'Field::FieldClamp',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldClamp',
    description: 'Clamp field values',
    
    
  },

  params: {
        min: {
      "default": 0
    },
    max: {
      "default": 1
    }
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        clamped: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldClamp',
      params: {
        field: inputs.field,
        min: params.min,
        max: params.max
      }
    });

    return {
      clamped: result
    };
  }
};
