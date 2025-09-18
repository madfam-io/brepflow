
import { NodeDefinition } from '@brepflow/types';

interface Params {
  scaleX: number;
  scaleY: number;
  scaleZ: number;
  uniform: boolean;
  centerX: number;
  centerY: number;
  centerZ: number;
  copy: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  scaled: Shape;
}

export const ScaleNode: NodeDefinition<ScaleInputs, ScaleOutputs, ScaleParams> = {
  type: 'Transform::Scale',
  category: 'Transform',
  

  metadata: {
    label: 'Scale',
    description: 'Scale shape uniformly or non-uniformly',
    
    
  },

  params: {
        scaleX: {
      "default": 1,
      "min": 0.001,
      "max": 1000,
      "description": "X scale factor"
    },
    scaleY: {
      "default": 1,
      "min": 0.001,
      "max": 1000,
      "description": "Y scale factor"
    },
    scaleZ: {
      "default": 1,
      "min": 0.001,
      "max": 1000,
      "description": "Z scale factor"
    },
    uniform: {
      "default": true,
      "description": "Use uniform scaling"
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
        scaled: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformScale',
      params: {
        shape: inputs.shape,
        scaleX: params.scaleX,
        scaleY: params.scaleY,
        scaleZ: params.scaleZ,
        uniform: params.uniform,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        copy: params.copy
      }
    });

    return {
      scaled: result
    };
  }
};
