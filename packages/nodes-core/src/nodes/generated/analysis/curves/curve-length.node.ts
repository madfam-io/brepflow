
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  segments: number;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  length: number;
  segmentLengths: number[];
  arcLength: Wire;
}

export const CurveLengthNode: NodeDefinition<CurveLengthInputs, CurveLengthOutputs, CurveLengthParams> = {
  type: 'Analysis::CurveLength',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveLength',
    description: 'Calculate curve length and properties',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    segments: {
      "default": 100,
      "min": 10,
      "max": 1000
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        length: 'number',
    segmentLengths: 'number[]',
    arcLength: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveLength',
      params: {
        curve: inputs.curve,
        tolerance: params.tolerance,
        segments: params.segments
      }
    });

    return {
      length: result,
      segmentLengths: result,
      arcLength: result
    };
  }
};
