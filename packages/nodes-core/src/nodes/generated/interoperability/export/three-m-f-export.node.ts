
import { NodeDefinition } from '@brepflow/types';

interface Params {
  units: string;
  includeColors: boolean;
  compression: boolean;
}
interface Inputs {
  models: Shape[];
  filePath: string;
}
interface Outputs {
  success: boolean;
  modelCount: number;
}

export const ThreeMFExportNode: NodeDefinition<ThreeMFExportInputs, ThreeMFExportOutputs, ThreeMFExportParams> = {
  type: 'Interoperability::ThreeMFExport',
  category: 'Interoperability',
  subcategory: 'Export',

  metadata: {
    label: 'ThreeMFExport',
    description: 'Export to 3D Manufacturing Format',
    
    
  },

  params: {
        units: {
      "default": "mm",
      "options": [
        "mm",
        "cm",
        "m"
      ]
    },
    includeColors: {
      "default": true
    },
    compression: {
      "default": true
    }
  },

  inputs: {
        models: 'Shape[]',
    filePath: 'string'
  },

  outputs: {
        success: 'boolean',
    modelCount: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'threeMFExport',
      params: {
        models: inputs.models,
        filePath: inputs.filePath,
        units: params.units,
        includeColors: params.includeColors,
        compression: params.compression
      }
    });

    return {
      success: result,
      modelCount: result
    };
  }
};
