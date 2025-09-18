
import { NodeDefinition } from '@brepflow/types';

interface Params {
  totalRise: number;
  landingSize: number;
  turnDirection: string;
}
interface Inputs {
  startPoint: Point;
}
interface Outputs {
  staircase: Shape;
  landing: Shape;
}

export const LShapedStairNode: NodeDefinition<LShapedStairInputs, LShapedStairOutputs, LShapedStairParams> = {
  type: 'Architecture::LShapedStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'LShapedStair',
    description: 'L-shaped staircase',
    
    
  },

  params: {
        totalRise: {
      "default": 3000,
      "min": 1000,
      "max": 6000
    },
    landingSize: {
      "default": 1200,
      "min": 900,
      "max": 2000
    },
    turnDirection: {
      "default": "right",
      "options": [
        "left",
        "right"
      ]
    }
  },

  inputs: {
        startPoint: 'Point'
  },

  outputs: {
        staircase: 'Shape',
    landing: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'lShapedStair',
      params: {
        startPoint: inputs.startPoint,
        totalRise: params.totalRise,
        landingSize: params.landingSize,
        turnDirection: params.turnDirection
      }
    });

    return {
      staircase: result,
      landing: result
    };
  }
};
