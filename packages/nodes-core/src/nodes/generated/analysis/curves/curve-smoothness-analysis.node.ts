
import { NodeDefinition } from '@brepflow/types';

interface Params {
  continuityLevel: string;
  tolerance: number;
  showBreaks: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  isSmooth: boolean;
  breakPoints: Point[];
  continuityReport: Properties;
}

export const CurveSmoothnessAnalysisNode: NodeDefinition<CurveSmoothnessAnalysisInputs, CurveSmoothnessAnalysisOutputs, CurveSmoothnessAnalysisParams> = {
  type: 'Analysis::CurveSmoothnessAnalysis',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveSmoothnessAnalysis',
    description: 'Analyze curve continuity and smoothness',
    
    
  },

  params: {
        continuityLevel: {
      "default": "G2",
      "options": [
        "C0",
        "C1",
        "C2",
        "G1",
        "G2"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showBreaks: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        isSmooth: 'boolean',
    breakPoints: 'Point[]',
    continuityReport: 'Properties'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveSmoothness',
      params: {
        curve: inputs.curve,
        continuityLevel: params.continuityLevel,
        tolerance: params.tolerance,
        showBreaks: params.showBreaks
      }
    });

    return {
      isSmooth: result,
      breakPoints: result,
      continuityReport: result
    };
  }
};
