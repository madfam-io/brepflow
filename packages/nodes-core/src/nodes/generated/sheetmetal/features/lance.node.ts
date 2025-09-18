
import { NodeDefinition } from '@brepflow/types';

interface Params {
  lanceLength: number;
  lanceWidth: number;
  lanceHeight: number;
  lanceAngle: number;
}
interface Inputs {
  sheet: Shape;
  sketch: Wire;
}
interface Outputs {
  result: Shape;
}

export const LanceNode: NodeDefinition<LanceInputs, LanceOutputs, LanceParams> = {
  type: 'SheetMetal::Lance',
  category: 'SheetMetal',
  subcategory: 'Features',

  metadata: {
    label: 'Lance',
    description: 'Create lanced form',
    
    
  },

  params: {
        lanceLength: {
      "default": 20,
      "min": 1,
      "max": 200
    },
    lanceWidth: {
      "default": 5,
      "min": 0.5,
      "max": 50
    },
    lanceHeight: {
      "default": 3,
      "min": 0.1,
      "max": 50
    },
    lanceAngle: {
      "default": 30,
      "min": 0,
      "max": 90
    }
  },

  inputs: {
        sheet: 'Shape',
    sketch: 'Wire'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetLance',
      params: {
        sheet: inputs.sheet,
        sketch: inputs.sketch,
        lanceLength: params.lanceLength,
        lanceWidth: params.lanceWidth,
        lanceHeight: params.lanceHeight,
        lanceAngle: params.lanceAngle
      }
    });

    return {
      result: result
    };
  }
};
