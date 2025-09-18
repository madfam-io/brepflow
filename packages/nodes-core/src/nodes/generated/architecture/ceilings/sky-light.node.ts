
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  glazingType: string;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  skylight: Shape;
  frame: Shape;
}

export const SkyLightNode: NodeDefinition<SkyLightInputs, SkyLightOutputs, SkyLightParams> = {
  type: 'Architecture::SkyLight',
  category: 'Architecture',
  subcategory: 'Ceilings',

  metadata: {
    label: 'SkyLight',
    description: 'Skylight opening',
    
    
  },

  params: {
        type: {
      "default": "pyramid",
      "options": [
        "flat",
        "pyramid",
        "barrel",
        "dome"
      ]
    },
    glazingType: {
      "default": "double",
      "options": [
        "single",
        "double",
        "triple",
        "aerogel"
      ]
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        skylight: 'Shape',
    frame: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'skyLight',
      params: {
        opening: inputs.opening,
        type: params.type,
        glazingType: params.glazingType
      }
    });

    return {
      skylight: result,
      frame: result
    };
  }
};
