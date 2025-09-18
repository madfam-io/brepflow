
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  approximation: boolean;
}
interface Inputs {
  surface1: Face;
  surface2: Face;
}
interface Outputs {
  intersectionCurves: Wire[];
  intersectionPoints: Point[];
}

export const SurfaceSurfaceIntersectionNode: NodeDefinition<SurfaceSurfaceIntersectionInputs, SurfaceSurfaceIntersectionOutputs, SurfaceSurfaceIntersectionParams> = {
  type: 'Analysis::SurfaceSurfaceIntersection',
  category: 'Analysis',
  subcategory: 'Intersection',

  metadata: {
    label: 'SurfaceSurfaceIntersection',
    description: 'Find surface-surface intersection curves',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    approximation: {
      "default": false
    }
  },

  inputs: {
        surface1: 'Face',
    surface2: 'Face'
  },

  outputs: {
        intersectionCurves: 'Wire[]',
    intersectionPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceSurfaceIntersection',
      params: {
        surface1: inputs.surface1,
        surface2: inputs.surface2,
        tolerance: params.tolerance,
        approximation: params.approximation
      }
    });

    return {
      intersectionCurves: result,
      intersectionPoints: result
    };
  }
};
