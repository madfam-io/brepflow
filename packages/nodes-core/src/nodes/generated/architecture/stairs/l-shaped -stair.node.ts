
import { NodeDefinition } from '@brepflow/types';
import { NumberParam, BooleanParam, StringParam, EnumParam, Vector3Param } from '../params';

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

export const LShaped StairNode: NodeDefinition<LShaped StairInputs, LShaped StairOutputs, LShaped StairParams> = {
  type: 'Architecture::LShaped Stair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'LShaped Stair',
    description: 'L-shaped staircase',
    
    
  },

  params: {
        totalRise: NumberParam({
      "default": 3000,
      "min": 1000,
      "max": 6000
    }),
    landingSize: NumberParam({
      "default": 1200,
      "min": 900,
      "max": 2000
    }),
    turnDirection: EnumParam({
      "default": "right",
      "options": [
        "left",
        "right"
      ]
    })
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
