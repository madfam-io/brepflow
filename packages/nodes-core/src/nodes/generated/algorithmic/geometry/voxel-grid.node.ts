
import { NodeDefinition } from '@brepflow/types';

interface Params {
  voxelSize: number;
  fillInterior: boolean;
  optimize: boolean;
}
interface Inputs {
  geometry: Shape;
}
interface Outputs {
  voxels: Shape[];
  grid: Properties;
  bounds: Properties;
}

export const VoxelGridNode: NodeDefinition<VoxelGridInputs, VoxelGridOutputs, VoxelGridParams> = {
  type: 'Algorithmic::VoxelGrid',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'VoxelGrid',
    description: 'Convert geometry to voxel representation',
    
    
  },

  params: {
        voxelSize: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    fillInterior: {
      "default": true
    },
    optimize: {
      "default": true
    }
  },

  inputs: {
        geometry: 'Shape'
  },

  outputs: {
        voxels: 'Shape[]',
    grid: 'Properties',
    bounds: 'Properties'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voxelGrid',
      params: {
        geometry: inputs.geometry,
        voxelSize: params.voxelSize,
        fillInterior: params.fillInterior,
        optimize: params.optimize
      }
    });

    return {
      voxels: result,
      grid: result,
      bounds: result
    };
  }
};
