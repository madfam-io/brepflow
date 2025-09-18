
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  diameter: number;
  mountType: string;
}
interface Inputs {
  stairEdge: Wire;
}
interface Outputs {
  handrail: Shape;
  posts: Shape[];
}

export const StairHandrailNode: NodeDefinition<StairHandrailInputs, StairHandrailOutputs, StairHandrailParams> = {
  type: 'Architecture::StairHandrail',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'StairHandrail',
    description: 'Stair handrail system',
    
    
  },

  params: {
        height: {
      "default": 900,
      "min": 850,
      "max": 1000
    },
    diameter: {
      "default": 50,
      "min": 40,
      "max": 60
    },
    mountType: {
      "default": "post",
      "options": [
        "wall",
        "post",
        "glass"
      ]
    }
  },

  inputs: {
        stairEdge: 'Wire'
  },

  outputs: {
        handrail: 'Shape',
    posts: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stairHandrail',
      params: {
        stairEdge: inputs.stairEdge,
        height: params.height,
        diameter: params.diameter,
        mountType: params.mountType
      }
    });

    return {
      handrail: result,
      posts: result
    };
  }
};
