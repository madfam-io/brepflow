
import { NodeDefinition } from '@brepflow/types';

interface Params {
  style: string;
  width: number;
}
interface Inputs {
  footprint: Wire;
}
interface Outputs {
  monumentalStair: Shape;
}

export const MonumentalStairNode: NodeDefinition<MonumentalStairInputs, MonumentalStairOutputs, MonumentalStairParams> = {
  type: 'Architecture::MonumentalStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'MonumentalStair',
    description: 'Grand monumental staircase',
    
    
  },

  params: {
        style: {
      "default": "imperial",
      "options": [
        "imperial",
        "bifurcated",
        "horseshoe"
      ]
    },
    width: {
      "default": 3000,
      "min": 2000,
      "max": 6000
    }
  },

  inputs: {
        footprint: 'Wire'
  },

  outputs: {
        monumentalStair: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'monumentalStair',
      params: {
        footprint: inputs.footprint,
        style: params.style,
        width: params.width
      }
    });

    return {
      monumentalStair: result
    };
  }
};
