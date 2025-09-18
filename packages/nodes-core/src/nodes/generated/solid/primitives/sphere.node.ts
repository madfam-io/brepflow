
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  centerX: number;
  centerY: number;
  centerZ: number;
  angle1: number;
  angle2: number;
  angle3: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const SphereNode: NodeDefinition<SphereInputs, SphereOutputs, SphereParams> = {
  type: 'Solid::Sphere',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Sphere',
    description: 'Create a parametric sphere',
    
    
  },

  params: {
        radius: {
      "default": 50,
      "min": 0.1,
      "max": 10000,
      "description": "Sphere radius"
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
      "min": -180,
      "max": 180,
      "description": "Start angle (longitude)"
    },
    angle2: {
      "default": 360,
      "min": 0,
      "max": 360,
      "description": "End angle (longitude)"
    },
    angle3: {
      "default": 180,
      "min": 0,
      "max": 180,
      "description": "Latitude range"
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeSphere',
      params: {
        
        radius: params.radius,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        angle1: params.angle1,
        angle2: params.angle2,
        angle3: params.angle3
      }
    });

    return {
      solid: result
    };
  }
};
