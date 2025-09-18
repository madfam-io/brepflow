
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius1: number;
  radius2: number;
  height: number;
  centerX: number;
  centerY: number;
  centerZ: number;
  angle: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const ConeNode: NodeDefinition<ConeInputs, ConeOutputs, ConeParams> = {
  type: 'Solid::Cone',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Cone',
    description: 'Create a parametric cone or truncated cone',
    
    
  },

  params: {
        radius1: {
      "default": 50,
      "min": 0,
      "max": 10000,
      "description": "Bottom radius"
    },
    radius2: {
      "default": 0,
      "min": 0,
      "max": 10000,
      "description": "Top radius (0 for pointed)"
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000,
      "description": "Cone height"
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
      type: 'makeCone',
      params: {
        
        radius1: params.radius1,
        radius2: params.radius2,
        height: params.height,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        angle: params.angle
      }
    });

    return {
      solid: result
    };
  }
};
