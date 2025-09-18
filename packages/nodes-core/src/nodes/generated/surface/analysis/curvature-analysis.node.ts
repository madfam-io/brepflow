
import { NodeDefinition } from '@brepflow/types';

interface Params {
  analysisType: string;
  sampleDensity: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  analysis: Data;
  visualization: Shape;
}

export const CurvatureAnalysisNode: NodeDefinition<CurvatureAnalysisInputs, CurvatureAnalysisOutputs, CurvatureAnalysisParams> = {
  type: 'Surface::CurvatureAnalysis',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'CurvatureAnalysis',
    description: 'Analyze surface curvature',
    
    
  },

  params: {
        analysisType: {
      "default": "gaussian",
      "options": [
        "gaussian",
        "mean",
        "principal",
        "radius"
      ]
    },
    sampleDensity: {
      "default": 50,
      "min": 10,
      "max": 200,
      "step": 1
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        analysis: 'Data',
    visualization: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curvatureAnalysis',
      params: {
        surface: inputs.surface,
        analysisType: params.analysisType,
        sampleDensity: params.sampleDensity
      }
    });

    return {
      analysis: result,
      visualization: result
    };
  }
};
