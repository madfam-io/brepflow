
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  direction: string;
  autoClose: boolean;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  solid: Shape;
}

export const ThickenNode: NodeDefinition<ThickenInputs, ThickenOutputs, ThickenParams> = {
  type: 'Advanced::Thicken',
  category: 'Advanced',
  subcategory: 'Thickness',

  metadata: {
    label: 'Thicken',
    description: 'Thicken surface to solid',
    
    
  },

  params: {
        thickness: {
      "default": 5,
      "min": 0.01,
      "max": 1000
    },
    direction: {
      "default": "normal",
      "options": [
        "normal",
        "reverse",
        "both"
      ]
    },
    autoClose: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        solid: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'thicken',
      params: {
        surface: inputs.surface,
        thickness: params.thickness,
        direction: params.direction,
        autoClose: params.autoClose
      }
    });

    return {
      solid: result
    };
  }
};
