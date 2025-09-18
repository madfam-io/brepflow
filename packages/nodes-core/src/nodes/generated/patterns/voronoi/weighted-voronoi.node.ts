
import { NodeDefinition } from '@brepflow/types';

interface Params {
  powerExponent: number;
}
interface Inputs {
  points: Point[];
  weights: number[];
}
interface Outputs {
  cells: Wire[];
}

export const WeightedVoronoiNode: NodeDefinition<WeightedVoronoiInputs, WeightedVoronoiOutputs, WeightedVoronoiParams> = {
  type: 'Patterns::WeightedVoronoi',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'WeightedVoronoi',
    description: 'Weighted Voronoi diagram',
    
    
  },

  params: {
        powerExponent: {
      "default": 2,
      "min": 1,
      "max": 5
    }
  },

  inputs: {
        points: 'Point[]',
    weights: 'number[]'
  },

  outputs: {
        cells: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiWeighted',
      params: {
        points: inputs.points,
        weights: inputs.weights,
        powerExponent: params.powerExponent
      }
    });

    return {
      cells: result
    };
  }
};
