
import { NodeDefinition } from '@brepflow/types';

interface Params {
  healGeometry: boolean;
  simplifyGeometry: boolean;
}
interface Inputs {
  fileData: Data;
}
interface Outputs {
  shape: Shape;
}

export const ImportParasolidNode: NodeDefinition<ImportParasolidInputs, ImportParasolidOutputs, ImportParasolidParams> = {
  type: 'IO::ImportParasolid',
  category: 'IO',
  subcategory: 'CAD',

  metadata: {
    label: 'ImportParasolid',
    description: 'Import Parasolid file',
    
    
  },

  params: {
        healGeometry: {
      "default": true
    },
    simplifyGeometry: {
      "default": false
    }
  },

  inputs: {
        fileData: 'Data'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'importParasolid',
      params: {
        fileData: inputs.fileData,
        healGeometry: params.healGeometry,
        simplifyGeometry: params.simplifyGeometry
      }
    });

    return {
      shape: result
    };
  }
};
