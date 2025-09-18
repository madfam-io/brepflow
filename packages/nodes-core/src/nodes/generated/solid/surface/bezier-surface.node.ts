
import { NodeDefinition } from '@brepflow/types';

interface Params {
  uDegree: number;
  vDegree: number;
}
interface Inputs {
  controlPoints: Point[][];
}
interface Outputs {
  surface: Face;
}

export const BezierSurfaceNode: NodeDefinition<BezierSurfaceInputs, BezierSurfaceOutputs, BezierSurfaceParams> = {
  type: 'Solid::BezierSurface',
  category: 'Solid',
  subcategory: 'Surface',

  metadata: {
    label: 'BezierSurface',
    description: 'Create a Bezier surface from control points',
    
    
  },

  params: {
        uDegree: {
      "default": 3,
      "min": 1,
      "max": 10
    },
    vDegree: {
      "default": 3,
      "min": 1,
      "max": 10
    }
  },

  inputs: {
        controlPoints: 'Point[][]'
  },

  outputs: {
        surface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeBezierSurface',
      params: {
        controlPoints: inputs.controlPoints,
        uDegree: params.uDegree,
        vDegree: params.vDegree
      }
    });

    return {
      surface: result
    };
  }
};
