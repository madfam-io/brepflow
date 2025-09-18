
import { NodeDefinition } from '@brepflow/types';

interface Params {
  continuityType: string;
  tolerance: number;
  showAnalysis: boolean;
}
interface Inputs {
  surface1: Face;
  surface2: Face;
}
interface Outputs {
  isContinuous: boolean;
  discontinuityPoints: Point[];
  analysisLines: Wire[];
}

export const SurfaceContinuityNode: NodeDefinition<SurfaceContinuityInputs, SurfaceContinuityOutputs, SurfaceContinuityParams> = {
  type: 'Analysis::SurfaceContinuity',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceContinuity',
    description: 'Analyze surface continuity across edges',
    
    
  },

  params: {
        continuityType: {
      "default": "G1",
      "options": [
        "G0",
        "G1",
        "G2",
        "C0",
        "C1",
        "C2"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showAnalysis: {
      "default": true
    }
  },

  inputs: {
        surface1: 'Face',
    surface2: 'Face'
  },

  outputs: {
        isContinuous: 'boolean',
    discontinuityPoints: 'Point[]',
    analysisLines: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceContinuity',
      params: {
        surface1: inputs.surface1,
        surface2: inputs.surface2,
        continuityType: params.continuityType,
        tolerance: params.tolerance,
        showAnalysis: params.showAnalysis
      }
    });

    return {
      isContinuous: result,
      discontinuityPoints: result,
      analysisLines: result
    };
  }
};
