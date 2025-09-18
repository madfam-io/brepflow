
import { NodeDefinition } from '@brepflow/types';

interface Params {
  nrc: number;
  panelType: string;
}
interface Inputs {
  ceilingArea: Face;
}
interface Outputs {
  acousticCeiling: Shape;
}

export const AcousticCeilingNode: NodeDefinition<AcousticCeilingInputs, AcousticCeilingOutputs, AcousticCeilingParams> = {
  type: 'Architecture::AcousticCeiling',
  category: 'Architecture',
  subcategory: 'Ceilings',

  metadata: {
    label: 'AcousticCeiling',
    description: 'Acoustic ceiling treatment',
    
    
  },

  params: {
        nrc: {
      "default": 0.85,
      "min": 0.5,
      "max": 1
    },
    panelType: {
      "default": "tiles",
      "options": [
        "perforated",
        "baffles",
        "clouds",
        "tiles"
      ]
    }
  },

  inputs: {
        ceilingArea: 'Face'
  },

  outputs: {
        acousticCeiling: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'acousticCeiling',
      params: {
        ceilingArea: inputs.ceilingArea,
        nrc: params.nrc,
        panelType: params.panelType
      }
    });

    return {
      acousticCeiling: result
    };
  }
};
