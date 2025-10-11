import type { NodeDefinition } from '@brepflow/types';

interface ToolChangerSetupParams {
  toolCount: number;
}

interface ToolChangerSetupInputs {
  toolRack: unknown;
}

interface ToolChangerSetupOutputs {
  toolChangeSequence: unknown;
}

export const ToolChangerSetupNode: NodeDefinition<ToolChangerSetupInputs, ToolChangerSetupOutputs, ToolChangerSetupParams> = {
  id: 'Fabrication::ToolChangerSetup',
  category: 'Fabrication',
  label: 'ToolChangerSetup',
  description: 'Automatic tool changer',
  inputs: {
    toolRack: {
      type: 'Transform',
      label: 'Tool Rack',
      required: true
    }
  },
  outputs: {
    toolChangeSequence: {
      type: 'Transform[]',
      label: 'Tool Change Sequence'
    }
  },
  params: {
    toolCount: {
      type: 'number',
      label: 'Tool Count',
      default: 6,
      min: 1,
      max: 20,
      step: 1
    }
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
  },
};
