
import { NodeDefinition } from '@brepflow/types';

interface Params {
  width: number;
  depth: number;
  height: number;
  centerX: number;
  centerY: number;
  centerZ: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const BoxNode: NodeDefinition<BoxInputs, BoxOutputs, BoxParams> = {
  type: 'Solid::Box',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Box',
    description: 'Create a parametric box/cuboid',
    
    
  },

  params: {
        width: {
      "default": 100,
      "min": 0.1,
      "max": 10000,
      "description": "Width (X dimension)"
    },
    depth: {
      "default": 100,
      "min": 0.1,
      "max": 10000,
      "description": "Depth (Y dimension)"
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000,
      "description": "Height (Z dimension)"
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
      type: 'makeBox',
      params: {
        
        width: params.width,
        depth: params.depth,
        height: params.height,
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
