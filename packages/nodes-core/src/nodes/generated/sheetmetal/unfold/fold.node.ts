
import { NodeDefinition } from '@brepflow/types';

interface Params {
  foldSequence: string;
  partialFold: number;
}
interface Inputs {
  flatPattern: Shape;
  bendLines: Edge[];
  bendAngles: number[];
}
interface Outputs {
  foldedShape: Shape;
}

export const FoldNode: NodeDefinition<FoldInputs, FoldOutputs, FoldParams> = {
  type: 'SheetMetal::Fold',
  category: 'SheetMetal',
  subcategory: 'Unfold',

  metadata: {
    label: 'Fold',
    description: 'Fold flat pattern to 3D',
    
    
  },

  params: {
        foldSequence: {
      "default": "auto",
      "description": "Bend sequence order"
    },
    partialFold: {
      "default": 1,
      "min": 0,
      "max": 1,
      "description": "Fold completion ratio"
    }
  },

  inputs: {
        flatPattern: 'Shape',
    bendLines: 'Edge[]',
    bendAngles: 'number[]'
  },

  outputs: {
        foldedShape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetFold',
      params: {
        flatPattern: inputs.flatPattern,
        bendLines: inputs.bendLines,
        bendAngles: inputs.bendAngles,
        foldSequence: params.foldSequence,
        partialFold: params.partialFold
      }
    });

    return {
      foldedShape: result
    };
  }
};
