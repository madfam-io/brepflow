
import { NodeDefinition } from '@brepflow/types';

interface Params {
  stripeCount: number;
  stripeDirection: [number, number, number];
  stripeWidth: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  stripes: Wire[];
}

export const ZebraAnalysisNode: NodeDefinition<ZebraAnalysisInputs, ZebraAnalysisOutputs, ZebraAnalysisParams> = {
  type: 'Surface::ZebraAnalysis',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'ZebraAnalysis',
    description: 'Zebra stripe analysis',
    
    
  },

  params: {
        stripeCount: {
      "default": 20,
      "min": 5,
      "max": 100,
      "step": 1
    },
    stripeDirection: {
      "default": [
        0,
        0,
        1
      ]
    },
    stripeWidth: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        stripes: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'zebraAnalysis',
      params: {
        surface: inputs.surface,
        stripeCount: params.stripeCount,
        stripeDirection: params.stripeDirection,
        stripeWidth: params.stripeWidth
      }
    });

    return {
      stripes: result
    };
  }
};
