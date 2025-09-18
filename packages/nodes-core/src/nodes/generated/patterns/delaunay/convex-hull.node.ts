
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  points: Point[];
}
interface Outputs {
  hull: Wire;
  vertices: Point[];
}

export const ConvexHullNode: NodeDefinition<ConvexHullInputs, ConvexHullOutputs, ConvexHullParams> = {
  type: 'Patterns::ConvexHull',
  category: 'Patterns',
  subcategory: 'Delaunay',

  metadata: {
    label: 'ConvexHull',
    description: 'Convex hull of points',
    
    
  },

  params: {
    
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        hull: 'Wire',
    vertices: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'convexHull',
      params: {
        points: inputs.points
        
      }
    });

    return {
      hull: result,
      vertices: result
    };
  }
};
