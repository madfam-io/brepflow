
import { NodeDefinition } from '@brepflow/types';

interface Params {
  reliefType: string;
  reliefSize: number;
  reliefRatio: number;
}
interface Inputs {
  sheet: Shape;
  corners: Vertex[];
}
interface Outputs {
  result: Shape;
}

export const CornerReliefNode: NodeDefinition<CornerReliefInputs, CornerReliefOutputs, CornerReliefParams> = {
  type: 'SheetMetal::CornerRelief',
  category: 'SheetMetal',
  subcategory: 'Corners',

  metadata: {
    label: 'CornerRelief',
    description: 'Add corner relief cuts',
    
    
  },

  params: {
        reliefType: {
      "default": "circular",
      "options": [
        "circular",
        "square",
        "obround",
        "tear"
      ]
    },
    reliefSize: {
      "default": 5,
      "min": 0.1,
      "max": 100
    },
    reliefRatio: {
      "default": 0.5,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        sheet: 'Shape',
    corners: 'Vertex[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetCornerRelief',
      params: {
        sheet: inputs.sheet,
        corners: inputs.corners,
        reliefType: params.reliefType,
        reliefSize: params.reliefSize,
        reliefRatio: params.reliefRatio
      }
    });

    return {
      result: result
    };
  }
};
