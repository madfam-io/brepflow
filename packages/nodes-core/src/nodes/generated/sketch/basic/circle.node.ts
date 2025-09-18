
import { NodeDefinition } from '@brepflow/types';

interface Params {
  centerX: number;
  centerY: number;
  centerZ: number;
  radius: number;
  filled: boolean;
}
type Inputs = {};
interface Outputs {
  shape: Shape;
}

export const CircleNode: NodeDefinition<CircleInputs, CircleOutputs, CircleParams> = {
  type: 'Sketch::Circle',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Circle',
    description: 'Create a circle',
    
    
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
    centerZ: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    radius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    filled: {
      "default": true,
      "description": "Create as face (filled) or wire (outline)"
    }
  },

  inputs: {
    
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeCircle',
      params: {
        
        centerX: params.centerX,
        centerY: params.centerY,
        centerZ: params.centerZ,
        radius: params.radius,
        filled: params.filled
      }
    });

    return {
      shape: result
    };
  }
};
