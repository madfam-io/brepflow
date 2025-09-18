
import { NodeDefinition } from '@brepflow/types';

interface Params {
  chainPitch: number;
  teeth: number;
  rollerDiameter: number;
  width: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  sprocket: Shape;
  pitchCircle: Wire;
}

export const ChainSprocketNode: NodeDefinition<ChainSprocketInputs, ChainSprocketOutputs, ChainSprocketParams> = {
  type: 'MechanicalEngineering::ChainSprocket',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'ChainSprocket',
    description: 'Create chain drive sprocket',
    
    
  },

  params: {
        chainPitch: {
      "default": 12.7,
      "min": 6,
      "max": 50,
      "description": "Chain pitch in mm"
    },
    teeth: {
      "default": 18,
      "min": 9,
      "max": 100
    },
    rollerDiameter: {
      "default": 7.92,
      "min": 3,
      "max": 30
    },
    width: {
      "default": 7.85,
      "min": 3,
      "max": 30
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        sprocket: 'Shape',
    pitchCircle: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'chainSprocket',
      params: {
        center: inputs.center,
        chainPitch: params.chainPitch,
        teeth: params.teeth,
        rollerDiameter: params.rollerDiameter,
        width: params.width
      }
    });

    return {
      sprocket: result,
      pitchCircle: result
    };
  }
};
