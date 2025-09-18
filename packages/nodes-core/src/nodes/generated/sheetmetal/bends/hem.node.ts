
import { NodeDefinition } from '@brepflow/types';

interface Params {
  hemType: string;
  hemLength: number;
  hemGap: number;
  hemRadius: number;
}
interface Inputs {
  sheet: Shape;
  edge: Edge;
}
interface Outputs {
  result: Shape;
}

export const HemNode: NodeDefinition<HemInputs, HemOutputs, HemParams> = {
  type: 'SheetMetal::Hem',
  category: 'SheetMetal',
  subcategory: 'Bends',

  metadata: {
    label: 'Hem',
    description: 'Create hemmed edge',
    
    
  },

  params: {
        hemType: {
      "default": "closed",
      "options": [
        "closed",
        "open",
        "teardrop"
      ]
    },
    hemLength: {
      "default": 10,
      "min": 0.1,
      "max": 100
    },
    hemGap: {
      "default": 0.5,
      "min": 0,
      "max": 10
    },
    hemRadius: {
      "default": 0.5,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        sheet: 'Shape',
    edge: 'Edge'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetHem',
      params: {
        sheet: inputs.sheet,
        edge: inputs.edge,
        hemType: params.hemType,
        hemLength: params.hemLength,
        hemGap: params.hemGap,
        hemRadius: params.hemRadius
      }
    });

    return {
      result: result
    };
  }
};
