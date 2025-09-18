
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
  radius: number;
  falloff: string;
}
interface Inputs {
  surfaces: Face[];
}
interface Outputs {
  field: ScalarField;
}

export const SurfaceAttractorNode: NodeDefinition<SurfaceAttractorInputs, SurfaceAttractorOutputs, SurfaceAttractorParams> = {
  type: 'Field::SurfaceAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'SurfaceAttractor',
    description: 'Surface attractor field',
    
    
  },

  params: {
        strength: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    radius: {
      "default": 30,
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
        surfaces: 'Face[]'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorSurface',
      params: {
        surfaces: inputs.surfaces,
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
