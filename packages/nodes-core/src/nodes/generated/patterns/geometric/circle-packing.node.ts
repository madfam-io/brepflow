
import { NodeDefinition } from '@brepflow/types';

interface Params {
  packingType: string;
  minRadius: number;
  maxRadius: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  circles: Wire[];
}

export const CirclePackingNode: NodeDefinition<CirclePackingInputs, CirclePackingOutputs, CirclePackingParams> = {
  type: 'Patterns::CirclePacking',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'CirclePacking',
    description: 'Circle packing pattern',
    
    
  },

  params: {
        packingType: {
      "default": "hexagonal",
      "options": [
        "hexagonal",
        "square",
        "random",
        "apollonian"
      ]
    },
    minRadius: {
      "default": 1,
      "min": 0.1
    },
    maxRadius: {
      "default": 5,
      "min": 0.1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        circles: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'circlePacking',
      params: {
        boundary: inputs.boundary,
        packingType: params.packingType,
        minRadius: params.minRadius,
        maxRadius: params.maxRadius
      }
    });

    return {
      circles: result
    };
  }
};
