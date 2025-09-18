
import { NodeDefinition } from '@brepflow/types';

interface Params {
  stcRating: number;
  massLayers: number;
}
interface Inputs {
  wallPath: Wire;
}
interface Outputs {
  acousticWall: Shape;
}

export const SoundproofWallNode: NodeDefinition<SoundproofWallInputs, SoundproofWallOutputs, SoundproofWallParams> = {
  type: 'Architecture::SoundproofWall',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'SoundproofWall',
    description: 'Acoustic wall assembly',
    
    
  },

  params: {
        stcRating: {
      "default": 50,
      "min": 30,
      "max": 80
    },
    massLayers: {
      "default": 2,
      "min": 1,
      "max": 4,
      "step": 1
    }
  },

  inputs: {
        wallPath: 'Wire'
  },

  outputs: {
        acousticWall: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'soundproofWall',
      params: {
        wallPath: inputs.wallPath,
        stcRating: params.stcRating,
        massLayers: params.massLayers
      }
    });

    return {
      acousticWall: result
    };
  }
};
