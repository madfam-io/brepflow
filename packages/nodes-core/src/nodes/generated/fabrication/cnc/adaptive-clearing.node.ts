
import { NodeDefinition } from '@brepflow/types';

interface Params {
  optimalLoad: number;
  helixAngle: number;
}
interface Inputs {
  region: Face;
  depth: Number;
}
interface Outputs {
  adaptivePath: Wire;
}

export const AdaptiveClearingNode: NodeDefinition<AdaptiveClearingInputs, AdaptiveClearingOutputs, AdaptiveClearingParams> = {
  type: 'Fabrication::AdaptiveClearing',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'AdaptiveClearing',
    description: 'Adaptive clearing strategy',
    
    
  },

  params: {
        optimalLoad: {
      "default": 0.4,
      "min": 0.1,
      "max": 1
    },
    helixAngle: {
      "default": 3,
      "min": 0,
      "max": 10
    }
  },

  inputs: {
        region: 'Face',
    depth: 'Number'
  },

  outputs: {
        adaptivePath: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'adaptiveClearing',
      params: {
        region: inputs.region,
        depth: inputs.depth,
        optimalLoad: params.optimalLoad,
        helixAngle: params.helixAngle
      }
    });

    return {
      adaptivePath: result
    };
  }
};
