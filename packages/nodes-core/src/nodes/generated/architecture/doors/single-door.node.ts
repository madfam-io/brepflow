
import { NodeDefinition } from '@brepflow/types';

interface Params {
  width: number;
  height: number;
  thickness: number;
  swing: string;
  opening: number;
}
interface Inputs {
  position: Point;
  wall?: Shape;
}
interface Outputs {
  door: Shape;
  frame: Shape;
}

export const SingleDoorNode: NodeDefinition<SingleDoorInputs, SingleDoorOutputs, SingleDoorParams> = {
  type: 'Architecture::SingleDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'SingleDoor',
    description: 'Single swing door',
    
    
  },

  params: {
        width: {
      "default": 900,
      "min": 600,
      "max": 1200
    },
    height: {
      "default": 2100,
      "min": 1800,
      "max": 2400
    },
    thickness: {
      "default": 45,
      "min": 35,
      "max": 60
    },
    swing: {
      "default": "right",
      "options": [
        "left",
        "right"
      ]
    },
    opening: {
      "default": 0,
      "min": 0,
      "max": 90
    }
  },

  inputs: {
        position: 'Point',
    wall: 'Shape'
  },

  outputs: {
        door: 'Shape',
    frame: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'singleDoor',
      params: {
        position: inputs.position,
        wall: inputs.wall,
        width: params.width,
        height: params.height,
        thickness: params.thickness,
        swing: params.swing,
        opening: params.opening
      }
    });

    return {
      door: result,
      frame: result
    };
  }
};
