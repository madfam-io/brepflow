
import { NodeDefinition } from '@brepflow/types';

interface Params {
  reliefType: string;
  reliefDepth: number;
  reliefWidth: number;
}
interface Inputs {
  sheet: Shape;
  bends: Edge[];
}
interface Outputs {
  result: Shape;
}

export const BendReliefNode: NodeDefinition<BendReliefInputs, BendReliefOutputs, BendReliefParams> = {
  type: 'SheetMetal::BendRelief',
  category: 'SheetMetal',
  subcategory: 'Corners',

  metadata: {
    label: 'BendRelief',
    description: 'Add bend relief cuts',
    
    
  },

  params: {
        reliefType: {
      "default": "rectangular",
      "options": [
        "rectangular",
        "obround",
        "tear"
      ]
    },
    reliefDepth: {
      "default": 5,
      "min": 0.1,
      "max": 100
    },
    reliefWidth: {
      "default": 2,
      "min": 0.1,
      "max": 50
    }
  },

  inputs: {
        sheet: 'Shape',
    bends: 'Edge[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetBendRelief',
      params: {
        sheet: inputs.sheet,
        bends: inputs.bends,
        reliefType: params.reliefType,
        reliefDepth: params.reliefDepth,
        reliefWidth: params.reliefWidth
      }
    });

    return {
      result: result
    };
  }
};
