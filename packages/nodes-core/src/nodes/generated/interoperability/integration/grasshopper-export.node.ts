
import { NodeDefinition } from '@brepflow/types';

interface Params {
  version: string;
  embedGeometry: boolean;
}
interface Inputs {
  definition: Properties;
  filePath: string;
}
interface Outputs {
  success: boolean;
  componentCount: number;
}

export const GrasshopperExportNode: NodeDefinition<GrasshopperExportInputs, GrasshopperExportOutputs, GrasshopperExportParams> = {
  type: 'Interoperability::GrasshopperExport',
  category: 'Interoperability',
  subcategory: 'Integration',

  metadata: {
    label: 'GrasshopperExport',
    description: 'Export definitions compatible with Grasshopper',
    
    
  },

  params: {
        version: {
      "default": "GH1",
      "options": [
        "GH1",
        "GH2"
      ]
    },
    embedGeometry: {
      "default": true
    }
  },

  inputs: {
        definition: 'Properties',
    filePath: 'string'
  },

  outputs: {
        success: 'boolean',
    componentCount: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'grasshopperExport',
      params: {
        definition: inputs.definition,
        filePath: inputs.filePath,
        version: params.version,
        embedGeometry: params.embedGeometry
      }
    });

    return {
      success: result,
      componentCount: result
    };
  }
};
