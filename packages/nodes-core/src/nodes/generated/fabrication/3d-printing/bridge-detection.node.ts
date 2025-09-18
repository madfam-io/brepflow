
import { NodeDefinition } from '@brepflow/types';

interface Params {
  maxBridge: number;
  overhangAngle: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  bridges: Face[];
  overhangs: Face[];
}

export const BridgeDetectionNode: NodeDefinition<BridgeDetectionInputs, BridgeDetectionOutputs, BridgeDetectionParams> = {
  type: 'Fabrication::BridgeDetection',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'BridgeDetection',
    description: 'Detect bridges and overhangs',
    
    
  },

  params: {
        maxBridge: {
      "default": 5,
      "min": 0,
      "max": 50
    },
    overhangAngle: {
      "default": 45,
      "min": 0,
      "max": 90
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        bridges: 'Face[]',
    overhangs: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'bridgeDetection',
      params: {
        model: inputs.model,
        maxBridge: params.maxBridge,
        overhangAngle: params.overhangAngle
      }
    });

    return {
      bridges: result,
      overhangs: result
    };
  }
};
