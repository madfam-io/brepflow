
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sprayWidth: number;
  overlap: number;
  standoffDistance: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  sprayPath: Transform[];
}

export const SprayPaintingNode: NodeDefinition<SprayPaintingInputs, SprayPaintingOutputs, SprayPaintingParams> = {
  type: 'Fabrication::SprayPainting',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'SprayPainting',
    description: 'Robotic spray painting',
    
    
  },

  params: {
        sprayWidth: {
      "default": 100,
      "min": 10,
      "max": 500
    },
    overlap: {
      "default": 0.5,
      "min": 0,
      "max": 0.9
    },
    standoffDistance: {
      "default": 200,
      "min": 50,
      "max": 500
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        sprayPath: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sprayPainting',
      params: {
        surface: inputs.surface,
        sprayWidth: params.sprayWidth,
        overlap: params.overlap,
        standoffDistance: params.standoffDistance
      }
    });

    return {
      sprayPath: result
    };
  }
};
