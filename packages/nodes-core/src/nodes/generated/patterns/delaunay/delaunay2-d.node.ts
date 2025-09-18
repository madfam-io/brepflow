
import { NodeDefinition } from '@brepflow/types';

interface Params {
  constrainEdges: boolean;
}
interface Inputs {
  points: Point[];
  constraints?: Edge[];
}
interface Outputs {
  triangles: Face[];
  mesh: Mesh;
}

export const Delaunay2DNode: NodeDefinition<Delaunay2DInputs, Delaunay2DOutputs, Delaunay2DParams> = {
  type: 'Patterns::Delaunay2D',
  category: 'Patterns',
  subcategory: 'Delaunay',

  metadata: {
    label: 'Delaunay2D',
    description: 'Create 2D Delaunay triangulation',
    
    
  },

  params: {
        constrainEdges: {
      "default": false
    }
  },

  inputs: {
        points: 'Point[]',
    constraints: 'Edge[]'
  },

  outputs: {
        triangles: 'Face[]',
    mesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'delaunay2D',
      params: {
        points: inputs.points,
        constraints: inputs.constraints,
        constrainEdges: params.constrainEdges
      }
    });

    return {
      triangles: result,
      mesh: result
    };
  }
};
