
import { NodeDefinition } from '@brepflow/types';

interface Params {
  louverLength: number;
  louverWidth: number;
  louverHeight: number;
  louverAngle: number;
}
interface Inputs {
  sheet: Shape;
  position: Point;
  direction: Vector;
}
interface Outputs {
  result: Shape;
}

export const LouverNode: NodeDefinition<LouverInputs, LouverOutputs, LouverParams> = {
  type: 'SheetMetal::Louver',
  category: 'SheetMetal',
  subcategory: 'Features',

  metadata: {
    label: 'Louver',
    description: 'Create louver ventilation',
    
    
  },

  params: {
        louverLength: {
      "default": 30,
      "min": 1,
      "max": 500
    },
    louverWidth: {
      "default": 5,
      "min": 0.5,
      "max": 100
    },
    louverHeight: {
      "default": 5,
      "min": 0.5,
      "max": 50
    },
    louverAngle: {
      "default": 45,
      "min": 0,
      "max": 90
    }
  },

  inputs: {
        sheet: 'Shape',
    position: 'Point',
    direction: 'Vector'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetLouver',
      params: {
        sheet: inputs.sheet,
        position: inputs.position,
        direction: inputs.direction,
        louverLength: params.louverLength,
        louverWidth: params.louverWidth,
        louverHeight: params.louverHeight,
        louverAngle: params.louverAngle
      }
    });

    return {
      result: result
    };
  }
};
