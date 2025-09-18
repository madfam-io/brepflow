
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
}
interface Inputs {
  geometry: Shape;
  field: VectorField;
}
interface Outputs {
  deformed: Shape;
}

export const FieldDeformNode: NodeDefinition<FieldDeformInputs, FieldDeformOutputs, FieldDeformParams> = {
  type: 'Field::FieldDeform',
  category: 'Field',
  subcategory: 'Deform',

  metadata: {
    label: 'FieldDeform',
    description: 'Deform by field',
    
    
  },

  params: {
        strength: {
      "default": 10,
      "min": -100,
      "max": 100
    }
  },

  inputs: {
        geometry: 'Shape',
    field: 'VectorField'
  },

  outputs: {
        deformed: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldDeform',
      params: {
        geometry: inputs.geometry,
        field: inputs.field,
        strength: params.strength
      }
    });

    return {
      deformed: result
    };
  }
};
