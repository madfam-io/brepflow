
import { NodeDefinition } from '@brepflow/types';

interface Params {
  axis: string;
  markPoints: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  minPoints: Point[];
  maxPoints: Point[];
  extremeValues: number[];
}

export const CurveExtremePointsNode: NodeDefinition<CurveExtremePointsInputs, CurveExtremePointsOutputs, CurveExtremePointsParams> = {
  type: 'Analysis::CurveExtremePoints',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveExtremePoints',
    description: 'Find extreme points (min/max X,Y,Z)',
    
    
  },

  params: {
        axis: {
      "default": "all",
      "options": [
        "X",
        "Y",
        "Z",
        "all"
      ]
    },
    markPoints: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        minPoints: 'Point[]',
    maxPoints: 'Point[]',
    extremeValues: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveExtremePoints',
      params: {
        curve: inputs.curve,
        axis: params.axis,
        markPoints: params.markPoints
      }
    });

    return {
      minPoints: result,
      maxPoints: result,
      extremeValues: result
    };
  }
};
