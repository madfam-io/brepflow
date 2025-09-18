
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  twist: number;
  taper: number;
}
interface Inputs {
  profile: Wire;
}
interface Outputs {
  solid: Solid;
}

export const PrismNode: NodeDefinition<PrismInputs, PrismOutputs, PrismParams> = {
  type: 'Solid::Prism',
  category: 'Solid',
  subcategory: 'Parametric',

  metadata: {
    label: 'Prism',
    description: 'Create a prism from a profile and height',
    
    
  },

  params: {
        height: {
      "default": 100,
      "min": 0.1,
      "max": 10000,
      "description": "Prism height"
    },
    twist: {
      "default": 0,
      "min": -360,
      "max": 360,
      "description": "Twist angle in degrees"
    },
    taper: {
      "default": 1,
      "min": 0.1,
      "max": 10,
      "description": "Taper ratio"
    }
  },

  inputs: {
        profile: 'Wire'
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makePrism',
      params: {
        profile: inputs.profile,
        height: params.height,
        twist: params.twist,
        taper: params.taper
      }
    });

    return {
      solid: result
    };
  }
};
