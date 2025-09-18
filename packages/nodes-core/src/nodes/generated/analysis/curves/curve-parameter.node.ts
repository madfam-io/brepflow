
import { NodeDefinition } from '@brepflow/types';

interface Params {
  samples: number;
  showParameter: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  parameterRange: number[];
  samplePoints: Point[];
  parameterValues: number[];
}

export const CurveParameterNode: NodeDefinition<CurveParameterInputs, CurveParameterOutputs, CurveParameterParams> = {
  type: 'Analysis::CurveParameter',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveParameter',
    description: 'Analyze curve parameterization',
    
    
  },

  params: {
        samples: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    showParameter: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        parameterRange: 'number[]',
    samplePoints: 'Point[]',
    parameterValues: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveParameter',
      params: {
        curve: inputs.curve,
        samples: params.samples,
        showParameter: params.showParameter
      }
    });

    return {
      parameterRange: result,
      samplePoints: result,
      parameterValues: result
    };
  }
};
