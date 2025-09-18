
import { NodeDefinition } from '@brepflow/types';

interface Params {
  count: number;
  totalAngle: number;
  centerX: number;
  centerY: number;
  centerZ: number;
  axisX: number;
  axisY: number;
  axisZ: number;
  rotateItems: boolean;
  merge: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  array: Shape[];
  merged: Shape;
}

export const PolarArrayNode: NodeDefinition<PolarArrayInputs, PolarArrayOutputs, PolarArrayParams> = {
  type: 'Transform::PolarArray',
  category: 'Transform',
  

  metadata: {
    label: 'PolarArray',
    description: 'Create circular/polar array',
    
    
  },

  params: {
        count: {
      "default": 8,
      "min": 2,
      "max": 1000,
      "step": 1
    },
    totalAngle: {
      "default": 360,
      "min": 0,
      "max": 360
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
    axisX: {
      "default": 0,
      "min": -1,
      "max": 1
    },
    axisY: {
      "default": 0,
      "min": -1,
      "max": 1
    },
    axisZ: {
      "default": 1,
      "min": -1,
      "max": 1
    },
    rotateItems: {
      "default": true
    },
    merge: {
      "default": false
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        array: 'Shape[]',
    merged: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformPolarArray',
      params: {
        shape: inputs.shape,
        count: params.count,
        totalAngle: params.totalAngle,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        axisX: params.axisX,
        axisY: params.axisY,
        axisZ: params.axisZ,
        rotateItems: params.rotateItems,
        merge: params.merge
      }
    });

    return {
      array: result,
      merged: result
    };
  }
};
