
import { NodeDefinition } from '@brepflow/types';

interface Params {
  speed: number;
  power: number;
}
interface Inputs {
  material: Data;
}
interface Outputs {
  edgeQuality: Data;
  heatAffectedZone: Number;
}

export const CutQualityNode: NodeDefinition<CutQualityInputs, CutQualityOutputs, CutQualityParams> = {
  type: 'Fabrication::CutQuality',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'CutQuality',
    description: 'Predict cut quality',
    
    
  },

  params: {
        speed: {
      "default": 20,
      "min": 1,
      "max": 100
    },
    power: {
      "default": 80,
      "min": 10,
      "max": 100
    }
  },

  inputs: {
        material: 'Data'
  },

  outputs: {
        edgeQuality: 'Data',
    heatAffectedZone: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'cutQuality',
      params: {
        material: inputs.material,
        speed: params.speed,
        power: params.power
      }
    });

    return {
      edgeQuality: result,
      heatAffectedZone: result
    };
  }
};
