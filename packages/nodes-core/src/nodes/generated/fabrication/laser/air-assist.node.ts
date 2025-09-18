
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pressure: number;
  nozzleType: string;
}
interface Inputs {
  material: Data;
}
interface Outputs {
  airSettings: Data;
}

export const AirAssistNode: NodeDefinition<AirAssistInputs, AirAssistOutputs, AirAssistParams> = {
  type: 'Fabrication::AirAssist',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'AirAssist',
    description: 'Air assist optimization',
    
    
  },

  params: {
        pressure: {
      "default": 20,
      "min": 0,
      "max": 100
    },
    nozzleType: {
      "default": "standard",
      "options": [
        "standard",
        "high-pressure",
        "wide",
        "focused"
      ]
    }
  },

  inputs: {
        material: 'Data'
  },

  outputs: {
        airSettings: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'airAssist',
      params: {
        material: inputs.material,
        pressure: params.pressure,
        nozzleType: params.nozzleType
      }
    });

    return {
      airSettings: result
    };
  }
};
