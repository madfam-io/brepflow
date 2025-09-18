
import { NodeDefinition } from '@brepflow/types';

interface Params {
  fromMin: number;
  fromMax: number;
  toMin: number;
  toMax: number;
}
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  remapped: ScalarField;
}

export const FieldRemapNode: NodeDefinition<FieldRemapInputs, FieldRemapOutputs, FieldRemapParams> = {
  type: 'Field::FieldRemap',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldRemap',
    description: 'Remap field values',
    
    
  },

  params: {
        fromMin: {
      "default": 0
    },
    fromMax: {
      "default": 1
    },
    toMin: {
      "default": 0
    },
    toMax: {
      "default": 100
    }
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        remapped: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldRemap',
      params: {
        field: inputs.field,
        fromMin: params.fromMin,
        fromMax: params.fromMax,
        toMin: params.toMin,
        toMax: params.toMax
      }
    });

    return {
      remapped: result
    };
  }
};
