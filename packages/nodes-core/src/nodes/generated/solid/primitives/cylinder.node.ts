
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  height: number;
  centerX: number;
  centerY: number;
  centerZ: number;
  axisX: number;
  axisY: number;
  axisZ: number;
  angle: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const CylinderNode: NodeDefinition<CylinderInputs, CylinderOutputs, CylinderParams> = {
  type: 'Solid::Cylinder',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Cylinder',
    description: 'Create a parametric cylinder',
    
    
  },

  params: {
        radius: {
      "default": 50,
      "min": 0.1,
      "max": 10000,
      "description": "Cylinder radius"
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000,
      "description": "Cylinder height"
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
    angle: {
      "default": 360,
      "min": 0,
      "max": 360,
      "description": "Sweep angle"
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeCylinder',
      params: {
        
        radius: params.radius,
        height: params.height,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        axisX: params.axisX,
        axisY: params.axisY,
        axisZ: params.axisZ,
        angle: params.angle
      }
    });

    return {
      solid: result
    };
  }
};
