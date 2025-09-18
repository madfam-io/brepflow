
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
  radius: number;
  falloff: string;
}
interface Inputs {
  curves: Wire[];
}
interface Outputs {
  field: ScalarField;
}

export const CurveAttractorNode: NodeDefinition<CurveAttractorInputs, CurveAttractorOutputs, CurveAttractorParams> = {
  type: 'Field::CurveAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'CurveAttractor',
    description: 'Curve attractor field',
    
    
  },

  params: {
        strength: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    radius: {
      "default": 50,
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
        curves: 'Wire[]'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorCurve',
      params: {
        curves: inputs.curves,
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
