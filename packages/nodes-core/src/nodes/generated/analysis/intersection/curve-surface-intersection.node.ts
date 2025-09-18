
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  extendCurve: boolean;
}
interface Inputs {
  curve: Wire;
  surface: Face;
}
interface Outputs {
  intersectionPoints: Point[];
  curveParameters: number[];
  surfaceParameters: Point[];
}

export const CurveSurfaceIntersectionNode: NodeDefinition<CurveSurfaceIntersectionInputs, CurveSurfaceIntersectionOutputs, CurveSurfaceIntersectionParams> = {
  type: 'Analysis::CurveSurfaceIntersection',
  category: 'Analysis',
  subcategory: 'Intersection',

  metadata: {
    label: 'CurveSurfaceIntersection',
    description: 'Find curve-surface intersections',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    extendCurve: {
      "default": false
    }
  },

  inputs: {
        curve: 'Wire',
    surface: 'Face'
  },

  outputs: {
        intersectionPoints: 'Point[]',
    curveParameters: 'number[]',
    surfaceParameters: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveSurfaceIntersection',
      params: {
        curve: inputs.curve,
        surface: inputs.surface,
        tolerance: params.tolerance,
        extendCurve: params.extendCurve
      }
    });

    return {
      intersectionPoints: result,
      curveParameters: result,
      surfaceParameters: result
    };
  }
};
