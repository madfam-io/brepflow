
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cornerType: string;
  gapDistance: number;
  overlapRatio: number;
}
interface Inputs {
  sheet: Shape;
  faces: Face[];
}
interface Outputs {
  result: Shape;
}

export const ClosedCornerNode: NodeDefinition<ClosedCornerInputs, ClosedCornerOutputs, ClosedCornerParams> = {
  type: 'SheetMetal::ClosedCorner',
  category: 'SheetMetal',
  subcategory: 'Corners',

  metadata: {
    label: 'ClosedCorner',
    description: 'Create closed corner',
    
    
  },

  params: {
        cornerType: {
      "default": "overlap",
      "options": [
        "overlap",
        "underlap",
        "butt"
      ]
    },
    gapDistance: {
      "default": 0,
      "min": 0,
      "max": 10
    },
    overlapRatio: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        sheet: 'Shape',
    faces: 'Face[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetClosedCorner',
      params: {
        sheet: inputs.sheet,
        faces: inputs.faces,
        cornerType: params.cornerType,
        gapDistance: params.gapDistance,
        overlapRatio: params.overlapRatio
      }
    });

    return {
      result: result
    };
  }
};
