
import { NodeDefinition } from '@brepflow/types';

interface Params {
  rating: string;
  closer: boolean;
  panic: boolean;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  fireDoor: Shape;
}

export const FireDoorNode: NodeDefinition<FireDoorInputs, FireDoorOutputs, FireDoorParams> = {
  type: 'Architecture::FireDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'FireDoor',
    description: 'Fire-rated door',
    
    
  },

  params: {
        rating: {
      "default": "60-min",
      "options": [
        "20-min",
        "45-min",
        "60-min",
        "90-min"
      ]
    },
    closer: {
      "default": true
    },
    panic: {
      "default": true
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        fireDoor: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fireDoor',
      params: {
        opening: inputs.opening,
        rating: params.rating,
        closer: params.closer,
        panic: params.panic
      }
    });

    return {
      fireDoor: result
    };
  }
};
