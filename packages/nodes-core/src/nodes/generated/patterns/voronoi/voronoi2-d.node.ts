
import { NodeDefinition } from '@brepflow/types';

interface Params {
  boundary: string;
  clipToBoundary: boolean;
}
interface Inputs {
  points: Point[];
  plane?: Plane;
}
interface Outputs {
  cells: Wire[];
  edges: Edge[];
}

export const Voronoi2DNode: NodeDefinition<Voronoi2DInputs, Voronoi2DOutputs, Voronoi2DParams> = {
  type: 'Patterns::Voronoi2D',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'Voronoi2D',
    description: 'Create 2D Voronoi diagram',
    
    
  },

  params: {
        boundary: {
      "default": "box",
      "options": [
        "box",
        "circle",
        "polygon"
      ]
    },
    clipToBoundary: {
      "default": true
    }
  },

  inputs: {
        points: 'Point[]',
    plane: 'Plane'
  },

  outputs: {
        cells: 'Wire[]',
    edges: 'Edge[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoi2D',
      params: {
        points: inputs.points,
        plane: inputs.plane,
        boundary: params.boundary,
        clipToBoundary: params.clipToBoundary
      }
    });

    return {
      cells: result,
      edges: result
    };
  }
};
