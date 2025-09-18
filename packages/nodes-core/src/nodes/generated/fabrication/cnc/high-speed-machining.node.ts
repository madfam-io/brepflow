
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cornerRadius: number;
  entrySpeed: number;
}
interface Inputs {
  toolpath: Wire[];
}
interface Outputs {
  hsmPath: Wire[];
}

export const HighSpeedMachiningNode: NodeDefinition<HighSpeedMachiningInputs, HighSpeedMachiningOutputs, HighSpeedMachiningParams> = {
  type: 'Fabrication::HighSpeedMachining',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'HighSpeedMachining',
    description: 'HSM toolpath optimization',
    
    
  },

  params: {
        cornerRadius: {
      "default": 2,
      "min": 0.1,
      "max": 10
    },
    entrySpeed: {
      "default": 0.5,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        toolpath: 'Wire[]'
  },

  outputs: {
        hsmPath: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'highSpeedMachining',
      params: {
        toolpath: inputs.toolpath,
        cornerRadius: params.cornerRadius,
        entrySpeed: params.entrySpeed
      }
    });

    return {
      hsmPath: result
    };
  }
};
