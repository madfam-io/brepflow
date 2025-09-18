
import { NodeDefinition } from '@brepflow/types';

interface Params {
  direction: [number, number, number];
  min: number;
  max: number;
}
interface Inputs {
  bounds: Box;
}
interface Outputs {
  field: ScalarField;
}

export const LinearFieldNode: NodeDefinition<LinearFieldInputs, LinearFieldOutputs, LinearFieldParams> = {
  type: 'Field::LinearField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'LinearField',
    description: 'Linear gradient field',
    
    
  },

  params: {
        direction: {
      "default": [
        1,
        0,
        0
      ]
    },
    min: {
      "default": 0
    },
    max: {
      "default": 1
    }
  },

  inputs: {
        bounds: 'Box'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldLinear',
      params: {
        bounds: inputs.bounds,
        direction: params.direction,
        min: params.min,
        max: params.max
      }
    });

    return {
      field: result
    };
  }
};
