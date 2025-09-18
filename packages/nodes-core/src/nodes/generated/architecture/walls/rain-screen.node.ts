
import { NodeDefinition } from '@brepflow/types';

interface Params {
  claddingType: string;
  ventGap: number;
}
interface Inputs {
  wall: Shape;
}
interface Outputs {
  rainScreen: Shape;
}

export const RainScreenNode: NodeDefinition<RainScreenInputs, RainScreenOutputs, RainScreenParams> = {
  type: 'Architecture::RainScreen',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'RainScreen',
    description: 'Rainscreen cladding system',
    
    
  },

  params: {
        claddingType: {
      "default": "composite",
      "options": [
        "metal",
        "composite",
        "terracotta",
        "wood"
      ]
    },
    ventGap: {
      "default": 25,
      "min": 20,
      "max": 50
    }
  },

  inputs: {
        wall: 'Shape'
  },

  outputs: {
        rainScreen: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rainScreen',
      params: {
        wall: inputs.wall,
        claddingType: params.claddingType,
        ventGap: params.ventGap
      }
    });

    return {
      rainScreen: result
    };
  }
};
