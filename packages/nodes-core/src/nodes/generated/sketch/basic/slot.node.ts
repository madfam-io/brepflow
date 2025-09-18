
import { NodeDefinition } from '@brepflow/types';

interface Params {
  centerX: number;
  centerY: number;
  length: number;
  width: number;
  angle: number;
}
type Inputs = {};
interface Outputs {
  face: Face;
}

export const SlotNode: NodeDefinition<SlotInputs, SlotOutputs, SlotParams> = {
  type: 'Sketch::Slot',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Slot',
    description: 'Create a slot (rounded rectangle)',
    
    
  },

  params: {
        centerX: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    centerY: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    length: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    width: {
      "default": 20,
      "min": 0.1,
      "max": 10000
    },
    angle: {
      "default": 0,
      "min": -180,
      "max": 180,
      "description": "Rotation angle"
    }
  },

  inputs: {
    
  },

  outputs: {
        face: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeSlot',
      params: {
        
        centerX: params.centerX,
        centerY: params.centerY,
        length: params.length,
        width: params.width,
        angle: params.angle
      }
    });

    return {
      face: result
    };
  }
};
