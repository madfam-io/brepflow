
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  includeInterior: boolean;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  hull: Shape;
  vertices: Point[];
  faces: Face[];
  volume: number;
}

export const ConvexHull3DNode: NodeDefinition<ConvexHull3DInputs, ConvexHull3DOutputs, ConvexHull3DParams> = {
  type: 'Algorithmic::ConvexHull3D',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'ConvexHull3D',
    description: 'Compute 3D convex hull',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    includeInterior: {
      "default": false
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        hull: 'Shape',
    vertices: 'Point[]',
    faces: 'Face[]',
    volume: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'convexHull3D',
      params: {
        points: inputs.points,
        tolerance: params.tolerance,
        includeInterior: params.includeInterior
      }
    });

    return {
      hull: result,
      vertices: result,
      faces: result,
      volume: result
    };
  }
};
