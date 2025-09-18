
import { NodeDefinition } from '@brepflow/types';

interface Params {
  fabricType: string;
  backlighting: boolean;
}
interface Inputs {
  ceilingBoundary: Wire;
}
interface Outputs {
  stretchCeiling: Face;
  track: Wire;
}

export const StretchCeilingNode: NodeDefinition<StretchCeilingInputs, StretchCeilingOutputs, StretchCeilingParams> = {
  type: 'Architecture::StretchCeiling',
  category: 'Architecture',
  subcategory: 'Ceilings',

  metadata: {
    label: 'StretchCeiling',
    description: 'Stretch fabric ceiling',
    
    
  },

  params: {
        fabricType: {
      "default": "matte",
      "options": [
        "matte",
        "satin",
        "gloss",
        "translucent"
      ]
    },
    backlighting: {
      "default": false
    }
  },

  inputs: {
        ceilingBoundary: 'Wire'
  },

  outputs: {
        stretchCeiling: 'Face',
    track: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stretchCeiling',
      params: {
        ceilingBoundary: inputs.ceilingBoundary,
        fabricType: params.fabricType,
        backlighting: params.backlighting
      }
    });

    return {
      stretchCeiling: result,
      track: result
    };
  }
};
