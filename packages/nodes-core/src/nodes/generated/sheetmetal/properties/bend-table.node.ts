
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tableType: string;
}
interface Inputs {
  tableData: Data;
}
interface Outputs {
  bendTable: Data;
}

export const BendTableNode: NodeDefinition<BendTableInputs, BendTableOutputs, BendTableParams> = {
  type: 'SheetMetal::BendTable',
  category: 'SheetMetal',
  subcategory: 'Properties',

  metadata: {
    label: 'BendTable',
    description: 'Define bend deduction table',
    
    
  },

  params: {
        tableType: {
      "default": "k-factor",
      "options": [
        "bend-deduction",
        "bend-allowance",
        "k-factor"
      ]
    }
  },

  inputs: {
        tableData: 'Data'
  },

  outputs: {
        bendTable: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sheetBendTable',
      params: {
        tableData: inputs.tableData,
        tableType: params.tableType
      }
    });

    return {
      bendTable: result
    };
  }
};
