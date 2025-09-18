
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sheetName: string;
  includeHeader: boolean;
  startCell: string;
}
interface Inputs {
  data: Properties[];
  filePath: string;
}
interface Outputs {
  success: boolean;
  cellsWritten: number;
}

export const ExcelWriterNode: NodeDefinition<ExcelWriterInputs, ExcelWriterOutputs, ExcelWriterParams> = {
  type: 'Interoperability::ExcelWriter',
  category: 'Interoperability',
  subcategory: 'Data',

  metadata: {
    label: 'ExcelWriter',
    description: 'Write data to Excel files',
    
    
  },

  params: {
        sheetName: {
      "default": "Sheet1"
    },
    includeHeader: {
      "default": true
    },
    startCell: {
      "default": "A1"
    }
  },

  inputs: {
        data: 'Properties[]',
    filePath: 'string'
  },

  outputs: {
        success: 'boolean',
    cellsWritten: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'excelWriter',
      params: {
        data: inputs.data,
        filePath: inputs.filePath,
        sheetName: params.sheetName,
        includeHeader: params.includeHeader,
        startCell: params.startCell
      }
    });

    return {
      success: result,
      cellsWritten: result
    };
  }
};
