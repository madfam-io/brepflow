
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
  height: number;
  radius: number;
  falloff: string;
}
interface Inputs {
  axis: Line;
}
interface Outputs {
  field: VectorField;
}

export const TwistAttractorNode: NodeDefinition<TwistAttractorInputs, TwistAttractorOutputs, TwistAttractorParams> = {
  type: 'Field::TwistAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'TwistAttractor',
    description: 'Twist attractor field',
    
    
  },

  params: {
        angle: {
      "default": 90,
      "min": -360,
      "max": 360
    },
    height: {
      "default": 100,
      "min": 0.1
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
        axis: 'Line'
  },

  outputs: {
        field: 'VectorField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorTwist',
      params: {
        axis: inputs.axis,
        angle: params.angle,
        height: params.height,
        radius: params.radius,
        falloff: params.falloff
      }
    });

    return {
      field: result
    };
  }
};
