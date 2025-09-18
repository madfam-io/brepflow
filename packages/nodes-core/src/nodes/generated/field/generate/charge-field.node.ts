
import { NodeDefinition } from '@brepflow/types';

interface Params {
  charge: number;
  falloff: string;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  field: ScalarField;
}

export const ChargeFieldNode: NodeDefinition<ChargeFieldInputs, ChargeFieldOutputs, ChargeFieldParams> = {
  type: 'Field::ChargeField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'ChargeField',
    description: 'Electric charge field',
    
    
  },

  params: {
        charge: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    falloff: {
      "default": "inverse-square",
      "options": [
        "inverse",
        "inverse-square",
        "exponential"
      ]
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldCharge',
      params: {
        points: inputs.points,
        charge: params.charge,
        falloff: params.falloff
      }
    });

    return {
      field: result
    };
  }
};
