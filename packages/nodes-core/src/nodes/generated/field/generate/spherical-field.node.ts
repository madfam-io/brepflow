
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerRadius: number;
  outerRadius: number;
  falloff: string;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  field: ScalarField;
}

export const SphericalFieldNode: NodeDefinition<SphericalFieldInputs, SphericalFieldOutputs, SphericalFieldParams> = {
  type: 'Field::SphericalField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'SphericalField',
    description: 'Spherical field',
    
    
  },

  params: {
        innerRadius: {
      "default": 10,
      "min": 0
    },
    outerRadius: {
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
        center: 'Point'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldSpherical',
      params: {
        center: inputs.center,
        innerRadius: params.innerRadius,
        outerRadius: params.outerRadius,
        falloff: params.falloff
      }
    });

    return {
      field: result
    };
  }
};
