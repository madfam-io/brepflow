
import { NodeDefinition } from '@brepflow/types';

interface Params {
  fanSpeed: number;
  layerTime: number;
}
interface Inputs {
  slices: Wire[];
}
interface Outputs {
  coolingZones: Wire[];
  fanProfile: Data;
}

export const CoolingAnalysisNode: NodeDefinition<CoolingAnalysisInputs, CoolingAnalysisOutputs, CoolingAnalysisParams> = {
  type: 'Fabrication::CoolingAnalysis',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'CoolingAnalysis',
    description: 'Analyze cooling requirements',
    
    
  },

  params: {
        fanSpeed: {
      "default": 100,
      "min": 0,
      "max": 100
    },
    layerTime: {
      "default": 10,
      "min": 1
    }
  },

  inputs: {
        slices: 'Wire[]'
  },

  outputs: {
        coolingZones: 'Wire[]',
    fanProfile: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'coolingAnalysis',
      params: {
        slices: inputs.slices,
        fanSpeed: params.fanSpeed,
        layerTime: params.layerTime
      }
    });

    return {
      coolingZones: result,
      fanProfile: result
    };
  }
};
