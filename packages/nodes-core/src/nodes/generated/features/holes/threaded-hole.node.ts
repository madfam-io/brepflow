
import { NodeDefinition } from '@brepflow/types';

interface Params {
  threadSize: string;
  pitch: number;
  depth: number;
  threadClass: string;
}
interface Inputs {
  solid: Shape;
  position: Point;
}
interface Outputs {
  shape: Shape;
}

export const ThreadedHoleNode: NodeDefinition<ThreadedHoleInputs, ThreadedHoleOutputs, ThreadedHoleParams> = {
  type: 'Features::ThreadedHole',
  category: 'Features',
  subcategory: 'Holes',

  metadata: {
    label: 'ThreadedHole',
    description: 'Creates a threaded (tapped) hole',
    
    tags: ["hole","thread","tap","fastener"],
  },

  params: {
        threadSize: {
      "default": "M6",
      "options": [
        "M3",
        "M4",
        "M5",
        "M6",
        "M8",
        "M10",
        "M12",
        "M16",
        "M20"
      ],
      "description": "Thread size"
    },
    pitch: {
      "default": 1,
      "min": 0.25,
      "max": 3,
      "step": 0.25,
      "description": "Thread pitch"
    },
    depth: {
      "default": 20,
      "min": 1,
      "max": 1000
    },
    threadClass: {
      "default": "6H",
      "options": [
        "6H",
        "6g",
        "7H"
      ],
      "description": "Thread tolerance class"
    }
  },

  inputs: {
        solid: 'Shape',
    position: 'Point'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    // TODO: Implement ThreadedHole logic
    throw new Error('ThreadedHole not yet implemented');
  }
};
