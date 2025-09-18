
import { NodeDefinition } from '@brepflow/types';

interface Params {
  panels: number;
  foldDirection: string;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  foldingDoor: Shape[];
}

export const FoldingDoorNode: NodeDefinition<FoldingDoorInputs, FoldingDoorOutputs, FoldingDoorParams> = {
  type: 'Architecture::FoldingDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'FoldingDoor',
    description: 'Bi-fold door system',
    
    
  },

  params: {
        panels: {
      "default": 4,
      "min": 2,
      "max": 8,
      "step": 2
    },
    foldDirection: {
      "default": "left",
      "options": [
        "left",
        "right",
        "center"
      ]
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        foldingDoor: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'foldingDoor',
      params: {
        opening: inputs.opening,
        panels: params.panels,
        foldDirection: params.foldDirection
      }
    });

    return {
      foldingDoor: result
    };
  }
};
