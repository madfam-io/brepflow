
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  wings: number;
  rotation: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  revolvingDoor: Shape;
}

export const RevolvingDoorNode: NodeDefinition<RevolvingDoorInputs, RevolvingDoorOutputs, RevolvingDoorParams> = {
  type: 'Architecture::RevolvingDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'RevolvingDoor',
    description: 'Revolving door entry',
    
    
  },

  params: {
        diameter: {
      "default": 2000,
      "min": 1800,
      "max": 3000
    },
    wings: {
      "default": 4,
      "min": 3,
      "max": 4,
      "step": 1
    },
    rotation: {
      "default": 0,
      "min": 0,
      "max": 360
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        revolvingDoor: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'revolvingDoor',
      params: {
        center: inputs.center,
        diameter: params.diameter,
        wings: params.wings,
        rotation: params.rotation
      }
    });

    return {
      revolvingDoor: result
    };
  }
};
