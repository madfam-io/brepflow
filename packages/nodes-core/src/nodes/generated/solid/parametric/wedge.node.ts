
import { NodeDefinition } from '@brepflow/types';

interface Params {
  dx: number;
  dy: number;
  dz: number;
  xmax: number;
  zmin: number;
  zmax: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const WedgeNode: NodeDefinition<WedgeInputs, WedgeOutputs, WedgeParams> = {
  type: 'Solid::Wedge',
  category: 'Solid',
  subcategory: 'Parametric',

  metadata: {
    label: 'Wedge',
    description: 'Create a wedge solid',
    
    
  },

  params: {
        dx: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    dy: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    dz: {
      "default": 75,
      "min": 0.1,
      "max": 10000
    },
    xmax: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    zmin: {
      "default": 25,
      "min": 0.1,
      "max": 10000
    },
    zmax: {
      "default": 50,
      "min": 0.1,
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
      type: 'makeWedge',
      params: {
        
        dx: params.dx,
        dy: params.dy,
        dz: params.dz,
        xmax: params.xmax,
        zmin: params.zmin,
        zmax: params.zmax
      }
    });

    return {
      solid: result
    };
  }
};
