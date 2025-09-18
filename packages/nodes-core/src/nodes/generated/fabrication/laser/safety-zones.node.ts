
import { NodeDefinition } from '@brepflow/types';

interface Params {
  margin: number;
}
interface Inputs {
  workArea: Face;
}
interface Outputs {
  safeArea: Face;
  noGoZones: Face[];
}

export const SafetyZonesNode: NodeDefinition<SafetyZonesInputs, SafetyZonesOutputs, SafetyZonesParams> = {
  type: 'Fabrication::SafetyZones',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'SafetyZones',
    description: 'Define safety zones',
    
    
  },

  params: {
        margin: {
      "default": 5,
      "min": 0,
      "max": 50
    }
  },

  inputs: {
        workArea: 'Face'
  },

  outputs: {
        safeArea: 'Face',
    noGoZones: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'safetyZones',
      params: {
        workArea: inputs.workArea,
        margin: params.margin
      }
    });

    return {
      safeArea: result,
      noGoZones: result
    };
  }
};
