
import { NodeDefinition } from '@brepflow/types';

interface Params {
  geodesic: boolean;
}
interface Inputs {
  surface: Face;
  points: Point[];
}
interface Outputs {
  cells: Wire[];
}

export const VoronoiOnSurfaceNode: NodeDefinition<VoronoiOnSurfaceInputs, VoronoiOnSurfaceOutputs, VoronoiOnSurfaceParams> = {
  type: 'Patterns::VoronoiOnSurface',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'VoronoiOnSurface',
    description: 'Voronoi on curved surface',
    
    
  },

  params: {
        geodesic: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face',
    points: 'Point[]'
  },

  outputs: {
        cells: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiSurface',
      params: {
        surface: inputs.surface,
        points: inputs.points,
        geodesic: params.geodesic
      }
    });

    return {
      cells: result
    };
  }
};
