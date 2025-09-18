
import { NodeDefinition } from '@brepflow/types';

interface Params {
  centerX: number;
  centerY: number;
  width: number;
  height: number;
  filled: boolean;
  cornerRadius: number;
}
type Inputs = {};
interface Outputs {
  shape: Shape;
}

export const RectangleNode: NodeDefinition<RectangleInputs, RectangleOutputs, RectangleParams> = {
  type: 'Sketch::Rectangle',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Rectangle',
    description: 'Create a rectangle',
    
    
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
    width: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    height: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    filled: {
      "default": true,
      "description": "Create as face (filled) or wire (outline)"
    },
    cornerRadius: {
      "default": 0,
      "min": 0,
      "max": 1000,
      "description": "Corner rounding radius"
    }
  },

  inputs: {
    
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeRectangle',
      params: {
        
        centerX: params.centerX,
        centerY: params.centerY,
        width: params.width,
        height: params.height,
        filled: params.filled,
        cornerRadius: params.cornerRadius
      }
    });

    return {
      shape: result
    };
  }
};
