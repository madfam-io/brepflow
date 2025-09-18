
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  size: number;
}
interface Inputs {
  plane?: Plane;
}
interface Outputs {
  tiles: Face[];
  pattern: Wire[];
}

export const GirihTilingNode: NodeDefinition<GirihTilingInputs, GirihTilingOutputs, GirihTilingParams> = {
  type: 'Patterns::GirihTiling',
  category: 'Patterns',
  subcategory: 'Islamic',

  metadata: {
    label: 'GirihTiling',
    description: 'Girih pentagonal tiling',
    
    
  },

  params: {
        type: {
      "default": "pentagon",
      "options": [
        "pentagon",
        "hexagon",
        "bow-tie",
        "rhombus",
        "decagon"
      ]
    },
    size: {
      "default": 10,
      "min": 1
    }
  },

  inputs: {
        plane: 'Plane'
  },

  outputs: {
        tiles: 'Face[]',
    pattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'girihTiling',
      params: {
        plane: inputs.plane,
        type: params.type,
        size: params.size
      }
    });

    return {
      tiles: result,
      pattern: result
    };
  }
};
