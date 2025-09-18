
import { NodeDefinition } from '@brepflow/types';

interface Params {
  maxAngle: number;
}
interface Inputs {
  geometry: Shape[];
  field: VectorField;
}
interface Outputs {
  rotated: Shape[];
}

export const FieldRotateNode: NodeDefinition<FieldRotateInputs, FieldRotateOutputs, FieldRotateParams> = {
  type: 'Field::FieldRotate',
  category: 'Field',
  subcategory: 'Deform',

  metadata: {
    label: 'FieldRotate',
    description: 'Rotate by field',
    
    
  },

  params: {
        maxAngle: {
      "default": 180,
      "min": -360,
      "max": 360
    }
  },

  inputs: {
        geometry: 'Shape[]',
    field: 'VectorField'
  },

  outputs: {
        rotated: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldRotate',
      params: {
        geometry: inputs.geometry,
        field: inputs.field,
        maxAngle: params.maxAngle
      }
    });

    return {
      rotated: result
    };
  }
};
