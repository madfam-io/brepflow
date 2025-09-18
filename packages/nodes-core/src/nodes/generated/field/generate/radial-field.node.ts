
import { NodeDefinition } from '@brepflow/types';

interface Params {
  falloff: string;
  radius: number;
  strength: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  field: ScalarField;
}

export const RadialFieldNode: NodeDefinition<RadialFieldInputs, RadialFieldOutputs, RadialFieldParams> = {
  type: 'Field::RadialField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'RadialField',
    description: 'Radial gradient field',
    
    
  },

  params: {
        falloff: {
      "default": "linear",
      "options": [
        "linear",
        "quadratic",
        "exponential",
        "gaussian"
      ]
    },
    radius: {
      "default": 100,
      "min": 0.1
    },
    strength: {
      "default": 1,
      "min": 0,
      "max": 10
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
      type: 'fieldRadial',
      params: {
        center: inputs.center,
        falloff: params.falloff,
        radius: params.radius,
        strength: params.strength
      }
    });

    return {
      field: result
    };
  }
};
