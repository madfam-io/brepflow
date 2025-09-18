
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
  radius: number;
  falloff: string;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  field: ScalarField;
}

export const PointAttractorNode: NodeDefinition<PointAttractorInputs, PointAttractorOutputs, PointAttractorParams> = {
  type: 'Field::PointAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'PointAttractor',
    description: 'Point attractor field',
    
    
  },

  params: {
        strength: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    radius: {
      "default": 100,
      "min": 0.1
    },
    falloff: {
      "default": "quadratic",
      "options": [
        "linear",
        "quadratic",
        "exponential",
        "gaussian"
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
      type: 'attractorPoint',
      params: {
        points: inputs.points,
        strength: params.strength,
        radius: params.radius,
        falloff: params.falloff
      }
    });

    return {
      field: result
    };
  }
};
