
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  markPoints: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  inflectionPoints: Point[];
  parameters: number[];
  markers: Shape[];
}

export const CurveInflectionPointsNode: NodeDefinition<CurveInflectionPointsInputs, CurveInflectionPointsOutputs, CurveInflectionPointsParams> = {
  type: 'Analysis::CurveInflectionPoints',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveInflectionPoints',
    description: 'Find curve inflection points',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    markPoints: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        inflectionPoints: 'Point[]',
    parameters: 'number[]',
    markers: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveInflection',
      params: {
        curve: inputs.curve,
        tolerance: params.tolerance,
        markPoints: params.markPoints
      }
    });

    return {
      inflectionPoints: result,
      parameters: result,
      markers: result
    };
  }
};
