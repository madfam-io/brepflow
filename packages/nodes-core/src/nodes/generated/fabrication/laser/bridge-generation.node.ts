
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bridgeWidth: number;
  bridgeCount: number;
}
interface Inputs {
  cutPath: Wire;
}
interface Outputs {
  bridgedPath: Wire[];
}

export const BridgeGenerationNode: NodeDefinition<BridgeGenerationInputs, BridgeGenerationOutputs, BridgeGenerationParams> = {
  type: 'Fabrication::BridgeGeneration',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'BridgeGeneration',
    description: 'Add holding bridges',
    
    
  },

  params: {
        bridgeWidth: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    bridgeCount: {
      "default": 4,
      "min": 1,
      "max": 20,
      "step": 1
    }
  },

  inputs: {
        cutPath: 'Wire'
  },

  outputs: {
        bridgedPath: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'bridgeGeneration',
      params: {
        cutPath: inputs.cutPath,
        bridgeWidth: params.bridgeWidth,
        bridgeCount: params.bridgeCount
      }
    });

    return {
      bridgedPath: result
    };
  }
};
