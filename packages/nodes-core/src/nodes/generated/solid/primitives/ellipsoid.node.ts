
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radiusX: number;
  radiusY: number;
  radiusZ: number;
  centerX: number;
  centerY: number;
  centerZ: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const EllipsoidNode: NodeDefinition<EllipsoidInputs, EllipsoidOutputs, EllipsoidParams> = {
  type: 'Solid::Ellipsoid',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Ellipsoid',
    description: 'Create a parametric ellipsoid',
    
    
  },

  params: {
        radiusX: {
      "default": 50,
      "min": 0.1,
      "max": 10000,
      "description": "X radius"
    },
    radiusY: {
      "default": 40,
      "min": 0.1,
      "max": 10000,
      "description": "Y radius"
    },
    radiusZ: {
      "default": 30,
      "min": 0.1,
      "max": 10000,
      "description": "Z radius"
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
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeEllipsoid',
      params: {
        
        radiusX: params.radiusX,
        radiusY: params.radiusY,
        radiusZ: params.radiusZ,
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ
      }
    });

    return {
      solid: result
    };
  }
};
