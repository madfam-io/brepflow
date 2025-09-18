
import { NodeDefinition } from '@brepflow/types';

interface Params {
  includeSubAssemblies: boolean;
  groupIdentical: boolean;
}
interface Inputs {
  assembly: Assembly;
}
interface Outputs {
  bom: BOM;
}

export const BillOfMaterialsNode: NodeDefinition<BillOfMaterialsInputs, BillOfMaterialsOutputs, BillOfMaterialsParams> = {
  type: 'Assembly::BillOfMaterials',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'BillOfMaterials',
    description: 'Generate bill of materials',
    
    
  },

  params: {
        includeSubAssemblies: {
      "default": true
    },
    groupIdentical: {
      "default": true
    }
  },

  inputs: {
        assembly: 'Assembly'
  },

  outputs: {
        bom: 'BOM'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyBOM',
      params: {
        assembly: inputs.assembly,
        includeSubAssemblies: params.includeSubAssemblies,
        groupIdentical: params.groupIdentical
      }
    });

    return {
      bom: result
    };
  }
};
