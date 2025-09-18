
import { NodeDefinition } from '@brepflow/types';

interface Params {
  zoneType: string;
  responseTime: number;
}
interface Inputs {
  zones: Box[];
}
interface Outputs {
  safetyConfiguration: Data;
}

export const SafetyZoneSetupNode: NodeDefinition<SafetyZoneSetupInputs, SafetyZoneSetupOutputs, SafetyZoneSetupParams> = {
  type: 'Fabrication::SafetyZoneSetup',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'SafetyZoneSetup',
    description: 'Define robot safety zones',
    
    
  },

  params: {
        zoneType: {
      "default": "slow",
      "options": [
        "stop",
        "slow",
        "warning"
      ]
    },
    responseTime: {
      "default": 0.5,
      "min": 0.1,
      "max": 2
    }
  },

  inputs: {
        zones: 'Box[]'
  },

  outputs: {
        safetyConfiguration: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'safetyZoneSetup',
      params: {
        zones: inputs.zones,
        zoneType: params.zoneType,
        responseTime: params.responseTime
      }
    });

    return {
      safetyConfiguration: result
    };
  }
};
