
import { NodeDefinition } from '@brepflow/types';

interface Params {
  targetTriangles: number;
  preserveFeatures: boolean;
  featureAngle: number;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  decimated: Mesh;
}

export const DecimateMeshNode: NodeDefinition<DecimateMeshInputs, DecimateMeshOutputs, DecimateMeshParams> = {
  type: 'Mesh::DecimateMesh',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'DecimateMesh',
    description: 'Decimate mesh intelligently',
    
    
  },

  params: {
        targetTriangles: {
      "default": 1000,
      "min": 10,
      "max": 1000000,
      "step": 100
    },
    preserveFeatures: {
      "default": true
    },
    featureAngle: {
      "default": 30,
      "min": 0,
      "max": 180
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        decimated: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'decimateMesh',
      params: {
        mesh: inputs.mesh,
        targetTriangles: params.targetTriangles,
        preserveFeatures: params.preserveFeatures,
        featureAngle: params.featureAngle
      }
    });

    return {
      decimated: result
    };
  }
};
