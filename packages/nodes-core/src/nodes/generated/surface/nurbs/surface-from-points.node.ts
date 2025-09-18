
import { NodeDefinition } from '@brepflow/types';

interface Params {
  degreeU: number;
  degreeV: number;
  smoothness: number;
}
interface Inputs {
  points: Point[];
  uCount: number;
  vCount: number;
}
interface Outputs {
  surface: Face;
}

export const SurfaceFromPointsNode: NodeDefinition<SurfaceFromPointsInputs, SurfaceFromPointsOutputs, SurfaceFromPointsParams> = {
  type: 'Surface::SurfaceFromPoints',
  category: 'Surface',
  subcategory: 'NURBS',

  metadata: {
    label: 'SurfaceFromPoints',
    description: 'Fit surface through points',
    
    
  },

  params: {
        degreeU: {
      "default": 3,
      "min": 1,
      "max": 10
    },
    degreeV: {
      "default": 3,
      "min": 1,
      "max": 10
    },
    smoothness: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        points: 'Point[]',
    uCount: 'number',
    vCount: 'number'
  },

  outputs: {
        surface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceFromPoints',
      params: {
        points: inputs.points,
        uCount: inputs.uCount,
        vCount: inputs.vCount,
        degreeU: params.degreeU,
        degreeV: params.degreeV,
        smoothness: params.smoothness
      }
    });

    return {
      surface: result
    };
  }
};
