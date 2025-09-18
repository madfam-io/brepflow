
import { NodeDefinition } from '@brepflow/types';

interface Params {
  loadTextures: boolean;
  loadMaterials: boolean;
  units: string;
}
interface Inputs {
  filePath: string;
}
interface Outputs {
  models: Shape[];
  materials: Properties[];
  build: Properties;
}

export const ThreeMFImportNode: NodeDefinition<ThreeMFImportInputs, ThreeMFImportOutputs, ThreeMFImportParams> = {
  type: 'Interoperability::ThreeMFImport',
  category: 'Interoperability',
  subcategory: 'Import',

  metadata: {
    label: 'ThreeMFImport',
    description: 'Import 3D Manufacturing Format files',
    
    
  },

  params: {
        loadTextures: {
      "default": true
    },
    loadMaterials: {
      "default": true
    },
    units: {
      "default": "auto",
      "options": [
        "auto",
        "mm",
        "cm",
        "m"
      ]
    }
  },

  inputs: {
        filePath: 'string'
  },

  outputs: {
        models: 'Shape[]',
    materials: 'Properties[]',
    build: 'Properties'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'threeMFImport',
      params: {
        filePath: inputs.filePath,
        loadTextures: params.loadTextures,
        loadMaterials: params.loadMaterials,
        units: params.units
      }
    });

    return {
      models: result,
      materials: result,
      build: result
    };
  }
};
