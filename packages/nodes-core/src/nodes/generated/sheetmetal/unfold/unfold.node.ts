
import { NodeDefinition } from '@brepflow/types';

interface Params {
  kFactor: number;
  bendAllowance: number;
  autoRelief: boolean;
}
interface Inputs {
  foldedShape: Shape;
  fixedFace?: Face;
}
interface Outputs {
  flatPattern: Shape;
  bendLines: Edge[];
  bendTable: Data;
}

export const UnfoldNode: NodeDefinition<UnfoldInputs, UnfoldOutputs, UnfoldParams> = {
  type: 'SheetMetal::Unfold',
  category: 'SheetMetal',
  subcategory: 'Unfold',

  metadata: {
    label: 'Unfold',
    description: 'Unfold sheet metal to flat pattern',
    
    
  },

  params: {
        kFactor: {
      "default": 0.44,
      "min": 0,
      "max": 1,
      "description": "Neutral axis position"
    },
    bendAllowance: {
      "default": 0,
      "min": -10,
      "max": 10
    },
    autoRelief: {
      "default": true
    }
  },

  inputs: {
        foldedShape: 'Shape',
    fixedFace: 'Face'
  },

  outputs: {
        flatPattern: 'Shape',
    bendLines: 'Edge[]',
    bendTable: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetUnfold',
      params: {
        foldedShape: inputs.foldedShape,
        fixedFace: inputs.fixedFace,
        kFactor: params.kFactor,
        bendAllowance: params.bendAllowance,
        autoRelief: params.autoRelief
      }
    });

    return {
      flatPattern: result,
      bendLines: result,
      bendTable: result
    };
  }
};
