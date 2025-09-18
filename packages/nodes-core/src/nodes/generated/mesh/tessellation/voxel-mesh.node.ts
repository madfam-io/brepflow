
import { NodeDefinition } from '@brepflow/types';

interface Params {
  voxelSize: number;
  fillInterior: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  voxels: Mesh;
}

export const VoxelMeshNode: NodeDefinition<VoxelMeshInputs, VoxelMeshOutputs, VoxelMeshParams> = {
  type: 'Mesh::VoxelMesh',
  category: 'Mesh',
  subcategory: 'Tessellation',

  metadata: {
    label: 'VoxelMesh',
    description: 'Create voxel mesh',
    
    
  },

  params: {
        voxelSize: {
      "default": 1,
      "min": 0.01,
      "max": 100
    },
    fillInterior: {
      "default": false
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        voxels: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voxelMesh',
      params: {
        shape: inputs.shape,
        voxelSize: params.voxelSize,
        fillInterior: params.fillInterior
      }
    });

    return {
      voxels: result
    };
  }
};
