
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
  convergence: number;
}
interface Inputs {
  points: Point[];
  boundary?: Wire;
}
interface Outputs {
  cells: Wire[];
  centroids: Point[];
}

export const CentroidalVoronoiNode: NodeDefinition<CentroidalVoronoiInputs, CentroidalVoronoiOutputs, CentroidalVoronoiParams> = {
  type: 'Patterns::CentroidalVoronoi',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'CentroidalVoronoi',
    description: 'Lloyd relaxation Voronoi',
    
    
  },

  params: {
        iterations: {
      "default": 10,
      "min": 1,
      "max": 100,
      "step": 1
    },
    convergence: {
      "default": 0.001,
      "min": 0
    }
  },

  inputs: {
        points: 'Point[]',
    boundary: 'Wire'
  },

  outputs: {
        cells: 'Wire[]',
    centroids: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiCentroidal',
      params: {
        points: inputs.points,
        boundary: inputs.boundary,
        iterations: params.iterations,
        convergence: params.convergence
      }
    });

    return {
      cells: result,
      centroids: result
    };
  }
};
