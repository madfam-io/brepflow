
import { NodeDefinition } from '@brepflow/types';

interface Params {
  beadWidth: number;
  beadHeight: number;
  beadProfile: string;
}
interface Inputs {
  sheet: Shape;
  path: Wire;
}
interface Outputs {
  result: Shape;
}

export const BeadNode: NodeDefinition<BeadInputs, BeadOutputs, BeadParams> = {
  type: 'SheetMetal::Bead',
  category: 'SheetMetal',
  subcategory: 'Features',

  metadata: {
    label: 'Bead',
    description: 'Create stiffening bead',
    
    
  },

  params: {
        beadWidth: {
      "default": 10,
      "min": 0.5,
      "max": 100
    },
    beadHeight: {
      "default": 3,
      "min": 0.1,
      "max": 50
    },
    beadProfile: {
      "default": "U",
      "options": [
        "U",
        "V",
        "round"
      ]
    }
  },

  inputs: {
        sheet: 'Shape',
    path: 'Wire'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetBead',
      params: {
        sheet: inputs.sheet,
        path: inputs.path,
        beadWidth: params.beadWidth,
        beadHeight: params.beadHeight,
        beadProfile: params.beadProfile
      }
    });

    return {
      result: result
    };
  }
};
