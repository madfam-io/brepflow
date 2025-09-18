
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  radius: number;
  angle: number;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  wrapped: Shape;
}

export const WrapNode: NodeDefinition<WrapInputs, WrapOutputs, WrapParams> = {
  type: 'Transform::Wrap',
  category: 'Transform',
  

  metadata: {
    label: 'Wrap',
    description: 'Wrap shape around cylinder or sphere',
    
    
  },

  params: {
        type: {
      "default": "cylinder",
      "options": [
        "cylinder",
        "sphere"
      ]
    },
    radius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    angle: {
      "default": 360,
      "min": 0,
      "max": 360
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        wrapped: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformWrap',
      params: {
        shape: inputs.shape,
        type: params.type,
        radius: params.radius,
        angle: params.angle
      }
    });

    return {
      wrapped: result
    };
  }
};
