
import { NodeDefinition } from '@brepflow/types';

interface Params {
  flutes: number;
  helixAngle: number;
}
interface Inputs {
  pocket: Face;
}
interface Outputs {
  evacuationScore: Number;
}

export const ChipEvacuationNode: NodeDefinition<ChipEvacuationInputs, ChipEvacuationOutputs, ChipEvacuationParams> = {
  type: 'Fabrication::ChipEvacuation',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ChipEvacuation',
    description: 'Chip evacuation analysis',
    
    
  },

  params: {
        flutes: {
      "default": 2,
      "min": 1,
      "max": 8,
      "step": 1
    },
    helixAngle: {
      "default": 30,
      "min": 0,
      "max": 60
    }
  },

  inputs: {
        pocket: 'Face'
  },

  outputs: {
        evacuationScore: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'chipEvacuation',
      params: {
        pocket: inputs.pocket,
        flutes: params.flutes,
        helixAngle: params.helixAngle
      }
    });

    return {
      evacuationScore: result
    };
  }
};
