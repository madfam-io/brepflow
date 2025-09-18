
import { NodeDefinition } from '@brepflow/types';

interface Params {
  width: number;
  depth: number;
  height: number;
  radius: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const RoundedBoxNode: NodeDefinition<RoundedBoxInputs, RoundedBoxOutputs, RoundedBoxParams> = {
  type: 'Solid::RoundedBox',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'RoundedBox',
    description: 'Create a box with rounded edges',
    
    
  },

  params: {
        width: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    depth: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    radius: {
      "default": 10,
      "min": 0.1,
      "max": 1000,
      "description": "Corner radius"
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeRoundedBox',
      params: {
        
        width: params.width,
        depth: params.depth,
        height: params.height,
        radius: params.radius
      }
    });

    return {
      solid: result
    };
  }
};
