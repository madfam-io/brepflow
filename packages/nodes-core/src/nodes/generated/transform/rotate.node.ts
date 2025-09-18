
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
  axisX: number;
  axisY: number;
  axisZ: number;
  centerX: number;
  centerY: number;
  centerZ: number;
  copy: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  rotated: Shape;
}

export const RotateNode: NodeDefinition<RotateInputs, RotateOutputs, RotateParams> = {
  type: 'Transform::Rotate',
  category: 'Transform',
  

  metadata: {
    label: 'Rotate',
    description: 'Rotate shape around axis',
    
    
  },

  params: {
        angle: {
      "default": 45,
      "min": -360,
      "max": 360,
      "description": "Rotation angle in degrees"
    },
    axisX: {
      "default": 0,
      "min": -1,
      "max": 1,
      "description": "Axis X component"
    },
    axisY: {
      "default": 0,
      "min": -1,
      "max": 1,
      "description": "Axis Y component"
    },
    axisZ: {
      "default": 1,
      "min": -1,
      "max": 1,
      "description": "Axis Z component"
    },
    centerX: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    centerY: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    centerZ: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    copy: {
      "default": true
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        rotated: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformRotate',
      params: {
        shape: inputs.shape,
        angle: params.angle,
        axisX: params.axisX,
        axisY: params.axisY,
        axisZ: params.axisZ,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        copy: params.copy
      }
    });

    return {
      rotated: result
    };
  }
};
