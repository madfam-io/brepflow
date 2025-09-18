
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pullDirection: [number, number, number];
  requiredAngle: number;
  colorMapping: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  analysis: Data;
  problematicFaces: Face[];
}

export const DraftAnalysisNode: NodeDefinition<DraftAnalysisInputs, DraftAnalysisOutputs, DraftAnalysisParams> = {
  type: 'Surface::DraftAnalysis',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'DraftAnalysis',
    description: 'Analyze draft angles',
    
    
  },

  params: {
        pullDirection: {
      "default": [
        0,
        0,
        1
      ]
    },
    requiredAngle: {
      "default": 3,
      "min": 0,
      "max": 90
    },
    colorMapping: {
      "default": true
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        analysis: 'Data',
    problematicFaces: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'draftAnalysis',
      params: {
        shape: inputs.shape,
        pullDirection: params.pullDirection,
        requiredAngle: params.requiredAngle,
        colorMapping: params.colorMapping
      }
    });

    return {
      analysis: result,
      problematicFaces: result
    };
  }
};
