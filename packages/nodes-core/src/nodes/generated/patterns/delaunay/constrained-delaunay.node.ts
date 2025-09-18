
import { NodeDefinition } from '@brepflow/types';

interface Params {
  refinement: boolean;
  maxArea: number;
}
interface Inputs {
  points: Point[];
  boundary: Wire;
  holes?: Wire[];
}
interface Outputs {
  triangulation: Mesh;
}

export const ConstrainedDelaunayNode: NodeDefinition<ConstrainedDelaunayInputs, ConstrainedDelaunayOutputs, ConstrainedDelaunayParams> = {
  type: 'Patterns::ConstrainedDelaunay',
  category: 'Patterns',
  subcategory: 'Delaunay',

  metadata: {
    label: 'ConstrainedDelaunay',
    description: 'Constrained Delaunay triangulation',
    
    
  },

  params: {
        refinement: {
      "default": true
    },
    maxArea: {
      "default": 100,
      "min": 0.1
    }
  },

  inputs: {
        points: 'Point[]',
    boundary: 'Wire',
    holes: 'Wire[]'
  },

  outputs: {
        triangulation: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'delaunayConstrained',
      params: {
        points: inputs.points,
        boundary: inputs.boundary,
        holes: inputs.holes,
        refinement: params.refinement,
        maxArea: params.maxArea
      }
    });

    return {
      triangulation: result
    };
  }
};
