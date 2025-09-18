
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  height: number;
  falloff: string;
}
interface Inputs {
  axis: Line;
}
interface Outputs {
  field: ScalarField;
}

export const CylindricalFieldNode: NodeDefinition<CylindricalFieldInputs, CylindricalFieldOutputs, CylindricalFieldParams> = {
  type: 'Field::CylindricalField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'CylindricalField',
    description: 'Cylindrical field',
    
    
  },

  params: {
        radius: {
      "default": 50,
      "min": 0.1
    },
    height: {
      "default": 100,
      "min": 0.1
    },
    falloff: {
      "default": "smooth",
      "options": [
        "linear",
        "smooth",
        "exponential"
      ]
    }
  },

  inputs: {
        axis: 'Line'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldCylindrical',
      params: {
        axis: inputs.axis,
        radius: params.radius,
        height: params.height,
        falloff: params.falloff
      }
    });

    return {
      field: result
    };
  }
};
