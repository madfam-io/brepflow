
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  material: string;
  depth: number;
}
interface Inputs {
  stairProfile: Wire;
}
interface Outputs {
  stringers: Shape[];
}

export const StairStringerNode: NodeDefinition<StairStringerInputs, StairStringerOutputs, StairStringerParams> = {
  type: 'Architecture::StairStringer',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'StairStringer',
    description: 'Stair stringer structure',
    
    
  },

  params: {
        type: {
      "default": "closed",
      "options": [
        "closed",
        "open",
        "mono"
      ]
    },
    material: {
      "default": "steel",
      "options": [
        "steel",
        "wood",
        "concrete"
      ]
    },
    depth: {
      "default": 300,
      "min": 200,
      "max": 500
    }
  },

  inputs: {
        stairProfile: 'Wire'
  },

  outputs: {
        stringers: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stairStringer',
      params: {
        stairProfile: inputs.stairProfile,
        type: params.type,
        material: params.material,
        depth: params.depth
      }
    });

    return {
      stringers: result
    };
  }
};
