
import { NodeDefinition } from '@brepflow/types';

interface Params {
  toolCount: number;
}
interface Inputs {
  toolRack: Transform;
}
interface Outputs {
  toolChangeSequence: Transform[];
}

export const ToolChangerSetupNode: NodeDefinition<ToolChangerSetupInputs, ToolChangerSetupOutputs, ToolChangerSetupParams> = {
  type: 'Fabrication::ToolChangerSetup',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'ToolChangerSetup',
    description: 'Automatic tool changer',
    
    
  },

  params: {
        toolCount: {
      "default": 6,
      "min": 1,
      "max": 20,
      "step": 1
    }
  },

  inputs: {
        toolRack: 'Transform'
  },

  outputs: {
        toolChangeSequence: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'toolChangerSetup',
      params: {
        toolRack: inputs.toolRack,
        toolCount: params.toolCount
      }
    });

    return {
      toolChangeSequence: result
    };
  }
};
