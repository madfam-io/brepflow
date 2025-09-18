
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  scale: number;
  seed: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  texture: Data;
}

export const ProceduralTextureNode: NodeDefinition<ProceduralTextureInputs, ProceduralTextureOutputs, ProceduralTextureParams> = {
  type: 'Patterns::ProceduralTexture',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'ProceduralTexture',
    description: 'Procedural texture generation',
    
    
  },

  params: {
        type: {
      "default": "wood",
      "options": [
        "wood",
        "marble",
        "clouds",
        "rust",
        "concrete"
      ]
    },
    scale: {
      "default": 10,
      "min": 1,
      "max": 100
    },
    seed: {
      "default": 0,
      "min": 0,
      "max": 999999
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        texture: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'proceduralTexture',
      params: {
        surface: inputs.surface,
        type: params.type,
        scale: params.scale,
        seed: params.seed
      }
    });

    return {
      texture: result
    };
  }
};
