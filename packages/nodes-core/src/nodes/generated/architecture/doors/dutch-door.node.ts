
import { NodeDefinition } from '@brepflow/types';

interface Params {
  splitHeight: number;
  topOpen: boolean;
  bottomOpen: boolean;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  topDoor: Shape;
  bottomDoor: Shape;
}

export const DutchDoorNode: NodeDefinition<DutchDoorInputs, DutchDoorOutputs, DutchDoorParams> = {
  type: 'Architecture::DutchDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'DutchDoor',
    description: 'Dutch split door',
    
    
  },

  params: {
        splitHeight: {
      "default": 1050,
      "min": 900,
      "max": 1200
    },
    topOpen: {
      "default": false
    },
    bottomOpen: {
      "default": false
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        topDoor: 'Shape',
    bottomDoor: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'dutchDoor',
      params: {
        opening: inputs.opening,
        splitHeight: params.splitHeight,
        topOpen: params.topOpen,
        bottomOpen: params.bottomOpen
      }
    });

    return {
      topDoor: result,
      bottomDoor: result
    };
  }
};
