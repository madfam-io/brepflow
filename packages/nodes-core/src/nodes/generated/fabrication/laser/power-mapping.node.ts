
import { NodeDefinition } from '@brepflow/types';

interface Params {
  material: string;
  thickness: number;
  wattage: number;
}
interface Inputs {
  geometry: Wire[];
}
interface Outputs {
  powerSettings: Data;
}

export const PowerMappingNode: NodeDefinition<PowerMappingInputs, PowerMappingOutputs, PowerMappingParams> = {
  type: 'Fabrication::PowerMapping',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'PowerMapping',
    description: 'Map laser power settings',
    
    
  },

  params: {
        material: {
      "default": "acrylic",
      "options": [
        "acrylic",
        "wood",
        "mdf",
        "cardboard",
        "leather",
        "fabric"
      ]
    },
    thickness: {
      "default": 3,
      "min": 0.1,
      "max": 50
    },
    wattage: {
      "default": 60,
      "min": 10,
      "max": 500
    }
  },

  inputs: {
        geometry: 'Wire[]'
  },

  outputs: {
        powerSettings: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'powerMapping',
      params: {
        geometry: inputs.geometry,
        material: params.material,
        thickness: params.thickness,
        wattage: params.wattage
      }
    });

    return {
      powerSettings: result
    };
  }
};
