
import { NodeDefinition } from '@brepflow/types';

interface Params {
  totalRise: number;
  clearance: number;
}
interface Inputs {
  startPoint: Point;
}
interface Outputs {
  staircase: Shape;
}

export const UShapedStairNode: NodeDefinition<UShapedStairInputs, UShapedStairOutputs, UShapedStairParams> = {
  type: 'Architecture::UShapedStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'UShapedStair',
    description: 'U-shaped staircase',
    
    
  },

  params: {
        totalRise: {
      "default": 3000,
      "min": 1000,
      "max": 6000
    },
    clearance: {
      "default": 100,
      "min": 50,
      "max": 300
    }
  },

  inputs: {
        startPoint: 'Point'
  },

  outputs: {
        staircase: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'uShapedStair',
      params: {
        startPoint: inputs.startPoint,
        totalRise: params.totalRise,
        clearance: params.clearance
      }
    });

    return {
      staircase: result
    };
  }
};
