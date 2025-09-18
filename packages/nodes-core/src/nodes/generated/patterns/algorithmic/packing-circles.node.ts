
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
}
interface Inputs {
  boundary: Wire;
  radii: number[];
}
interface Outputs {
  circles: Wire[];
  centers: Point[];
}

export const PackingCirclesNode: NodeDefinition<PackingCirclesInputs, PackingCirclesOutputs, PackingCirclesParams> = {
  type: 'Patterns::PackingCircles',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'PackingCircles',
    description: 'Circle packing algorithms',
    
    
  },

  params: {
        algorithm: {
      "default": "power-diagram",
      "options": [
        "power-diagram",
        "front-chain",
        "apollonian"
      ]
    }
  },

  inputs: {
        boundary: 'Wire',
    radii: 'number[]'
  },

  outputs: {
        circles: 'Wire[]',
    centers: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'packingCircles',
      params: {
        boundary: inputs.boundary,
        radii: inputs.radii,
        algorithm: params.algorithm
      }
    });

    return {
      circles: result,
      centers: result
    };
  }
};
