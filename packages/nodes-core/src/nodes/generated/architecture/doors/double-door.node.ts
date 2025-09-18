
import { NodeDefinition } from '@brepflow/types';

interface Params {
  totalWidth: number;
  height: number;
  activeLeaf: string;
}
interface Inputs {
  position: Point;
}
interface Outputs {
  doors: Shape[];
  frame: Shape;
}

export const DoubleDoorNode: NodeDefinition<DoubleDoorInputs, DoubleDoorOutputs, DoubleDoorParams> = {
  type: 'Architecture::DoubleDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'DoubleDoor',
    description: 'Double swing door',
    
    
  },

  params: {
        totalWidth: {
      "default": 1800,
      "min": 1200,
      "max": 2400
    },
    height: {
      "default": 2100,
      "min": 1800,
      "max": 2400
    },
    activeLeaf: {
      "default": "both",
      "options": [
        "left",
        "right",
        "both"
      ]
    }
  },

  inputs: {
        position: 'Point'
  },

  outputs: {
        doors: 'Shape[]',
    frame: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'doubleDoor',
      params: {
        position: inputs.position,
        totalWidth: params.totalWidth,
        height: params.height,
        activeLeaf: params.activeLeaf
      }
    });

    return {
      doors: result,
      frame: result
    };
  }
};
