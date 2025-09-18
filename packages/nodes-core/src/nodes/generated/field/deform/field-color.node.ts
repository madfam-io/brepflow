
import { NodeDefinition } from '@brepflow/types';

interface Params {
  gradient: string;
}
interface Inputs {
  mesh: Mesh;
  field: ScalarField;
}
interface Outputs {
  coloredMesh: Mesh;
}

export const FieldColorNode: NodeDefinition<FieldColorInputs, FieldColorOutputs, FieldColorParams> = {
  type: 'Field::FieldColor',
  category: 'Field',
  subcategory: 'Deform',

  metadata: {
    label: 'FieldColor',
    description: 'Color by field value',
    
    
  },

  params: {
        gradient: {
      "default": "rainbow",
      "options": [
        "grayscale",
        "rainbow",
        "heat",
        "cool",
        "custom"
      ]
    }
  },

  inputs: {
        mesh: 'Mesh',
    field: 'ScalarField'
  },

  outputs: {
        coloredMesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldColor',
      params: {
        mesh: inputs.mesh,
        field: inputs.field,
        gradient: params.gradient
      }
    });

    return {
      coloredMesh: result
    };
  }
};
