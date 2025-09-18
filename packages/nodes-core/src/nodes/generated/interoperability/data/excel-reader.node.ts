
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sheetName: string;
  hasHeader: boolean;
  range: string;
}
interface Inputs {
  filePath: string;
}
interface Outputs {
  data: Properties[];
  sheetNames: string[];
  dimensions: number[];
}

export const ExcelReaderNode: NodeDefinition<ExcelReaderInputs, ExcelReaderOutputs, ExcelReaderParams> = {
  type: 'Interoperability::ExcelReader',
  category: 'Interoperability',
  subcategory: 'Data',

  metadata: {
    label: 'ExcelReader',
    description: 'Read Excel spreadsheet files',
    
    
  },

  params: {
        sheetName: {
      "default": "",
      "description": "Sheet name (empty for first)"
    },
    hasHeader: {
      "default": true
    },
    range: {
      "default": "",
      "description": "Cell range (e.g., A1:C10)"
    }
  },

  inputs: {
        filePath: 'string'
  },

  outputs: {
        data: 'Properties[]',
    sheetNames: 'string[]',
    dimensions: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'excelReader',
      params: {
        filePath: inputs.filePath,
        sheetName: params.sheetName,
        hasHeader: params.hasHeader,
        range: params.range
      }
    });

    return {
      data: result,
      sheetNames: result,
      dimensions: result
    };
  }
};
