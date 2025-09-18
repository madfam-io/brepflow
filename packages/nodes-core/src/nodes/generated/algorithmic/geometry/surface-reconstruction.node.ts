
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  depth: number;
  samples: number;
}
interface Inputs {
  points: Point[];
  normals?: Vector[];
}
interface Outputs {
  surface: Shape;
  mesh: Shape;
  quality: number;
}

export const SurfaceReconstructionNode: NodeDefinition<SurfaceReconstructionInputs, SurfaceReconstructionOutputs, SurfaceReconstructionParams> = {
  type: 'Algorithmic::SurfaceReconstruction',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'SurfaceReconstruction',
    description: 'Reconstruct surface from point cloud',
    
    
  },

  params: {
        algorithm: {
      "default": "poisson",
      "options": [
        "poisson",
        "delaunay",
        "rbf"
      ]
    },
    depth: {
      "default": 8,
      "min": 4,
      "max": 12
    },
    samples: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        points: 'Point[]',
    normals: 'Vector[]'
  },

  outputs: {
        surface: 'Shape',
    mesh: 'Shape',
    quality: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceReconstruction',
      params: {
        points: inputs.points,
        normals: inputs.normals,
        algorithm: params.algorithm,
        depth: params.depth,
        samples: params.samples
      }
    });

    return {
      surface: result,
      mesh: result,
      quality: result
    };
  }
};
