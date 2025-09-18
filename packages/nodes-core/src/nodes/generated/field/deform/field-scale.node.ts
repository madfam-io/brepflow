
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minScale: number;
  maxScale: number;
}
interface Inputs {
  geometry: Shape[];
  field: ScalarField;
}
interface Outputs {
  scaled: Shape[];
}

export const FieldScaleNode: NodeDefinition<FieldScaleInputs, FieldScaleOutputs, FieldScaleParams> = {
  type: 'Field::FieldScale',
  category: 'Field',
  subcategory: 'Deform',

  metadata: {
    label: 'FieldScale',
    description: 'Scale by field',
    
    
  },

  params: {
        minScale: {
      "default": 0.5,
      "min": 0
    },
    maxScale: {
      "default": 2,
      "min": 0
    }
  },

  inputs: {
        geometry: 'Shape[]',
    field: 'ScalarField'
  },

  outputs: {
        scaled: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldScale',
      params: {
        geometry: inputs.geometry,
        field: inputs.field,
        minScale: params.minScale,
        maxScale: params.maxScale
      }
    });

    return {
      scaled: result
    };
  }
};
