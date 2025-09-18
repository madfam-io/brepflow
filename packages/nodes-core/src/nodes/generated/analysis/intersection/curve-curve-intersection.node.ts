
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  extendCurves: boolean;
}
interface Inputs {
  curve1: Wire;
  curve2: Wire;
}
interface Outputs {
  intersectionPoints: Point[];
  parameters1: number[];
  parameters2: number[];
}

export const CurveCurveIntersectionNode: NodeDefinition<CurveCurveIntersectionInputs, CurveCurveIntersectionOutputs, CurveCurveIntersectionParams> = {
  type: 'Analysis::CurveCurveIntersection',
  category: 'Analysis',
  subcategory: 'Intersection',

  metadata: {
    label: 'CurveCurveIntersection',
    description: 'Find curve-curve intersections',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    extendCurves: {
      "default": false
    }
  },

  inputs: {
        curve1: 'Wire',
    curve2: 'Wire'
  },

  outputs: {
        intersectionPoints: 'Point[]',
    parameters1: 'number[]',
    parameters2: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveCurveIntersection',
      params: {
        curve1: inputs.curve1,
        curve2: inputs.curve2,
        tolerance: params.tolerance,
        extendCurves: params.extendCurves
      }
    });

    return {
      intersectionPoints: result,
      parameters1: result,
      parameters2: result
    };
  }
};
