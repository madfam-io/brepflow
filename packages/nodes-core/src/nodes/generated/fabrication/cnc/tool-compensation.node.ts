
import { NodeDefinition } from '@brepflow/types';

interface Params {
  toolRadius: number;
  wearOffset: number;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  compensatedPath: Wire;
}

export const ToolCompensationNode: NodeDefinition<ToolCompensationInputs, ToolCompensationOutputs, ToolCompensationParams> = {
  type: 'Fabrication::ToolCompensation',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ToolCompensation',
    description: 'Tool radius compensation',
    
    
  },

  params: {
        toolRadius: {
      "default": 3,
      "min": 0.1,
      "max": 25
    },
    wearOffset: {
      "default": 0,
      "min": -1,
      "max": 1
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        compensatedPath: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'toolCompensation',
      params: {
        path: inputs.path,
        toolRadius: params.toolRadius,
        wearOffset: params.wearOffset
      }
    });

    return {
      compensatedPath: result
    };
  }
};
