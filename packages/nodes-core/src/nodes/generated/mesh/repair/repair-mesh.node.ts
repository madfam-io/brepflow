
import { NodeDefinition } from '@brepflow/types';

interface Params {
  fillHoles: boolean;
  fixNormals: boolean;
  removeDegenerate: boolean;
  removeDuplicates: boolean;
  makeManifold: boolean;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  repaired: Mesh;
  report: Data;
}

export const RepairMeshNode: NodeDefinition<RepairMeshInputs, RepairMeshOutputs, RepairMeshParams> = {
  type: 'Mesh::RepairMesh',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'RepairMesh',
    description: 'Repair mesh defects',
    
    
  },

  params: {
        fillHoles: {
      "default": true
    },
    fixNormals: {
      "default": true
    },
    removeDegenerate: {
      "default": true
    },
    removeDuplicates: {
      "default": true
    },
    makeManifold: {
      "default": false
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        repaired: 'Mesh',
    report: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'repairMesh',
      params: {
        mesh: inputs.mesh,
        fillHoles: params.fillHoles,
        fixNormals: params.fixNormals,
        removeDegenerate: params.removeDegenerate,
        removeDuplicates: params.removeDuplicates,
        makeManifold: params.makeManifold
      }
    });

    return {
      repaired: result,
      report: result
    };
  }
};
