
import { NodeDefinition } from '@brepflow/types';

interface Params {
  majorRadius: number;
  minorRadius: number;
  centerX: number;
  centerY: number;
  centerZ: number;
  angle1: number;
  angle2: number;
  angle: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const TorusNode: NodeDefinition<TorusInputs, TorusOutputs, TorusParams> = {
  type: 'Solid::Torus',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Torus',
    description: 'Create a parametric torus',
    
    
  },

  params: {
        majorRadius: {
      "default": 50,
      "min": 0.1,
      "max": 10000,
      "description": "Major radius"
    },
    minorRadius: {
      "default": 10,
      "min": 0.1,
      "max": 10000,
      "description": "Minor radius"
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
    angle1: {
      "default": 0,
      "min": 0,
      "max": 360,
      "description": "Start angle"
    },
    angle2: {
      "default": 360,
      "min": 0,
      "max": 360,
      "description": "End angle"
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
      type: 'makeTorus',
      params: {
        
        majorRadius: params.majorRadius,
        minorRadius: params.minorRadius,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        angle1: params.angle1,
        angle2: params.angle2,
        angle: params.angle
      }
    });

    return {
      solid: result
    };
  }
};
