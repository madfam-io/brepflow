
import { NodeDefinition } from '@brepflow/types';

interface Params {
  targetRatio: number;
  preserveBoundaries: boolean;
  preserveTopology: boolean;
  maxError: number;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  simplified: Mesh;
  triangleCount: number;
}

export const SimplifyMeshNode: NodeDefinition<SimplifyMeshInputs, SimplifyMeshOutputs, SimplifyMeshParams> = {
  type: 'Mesh::SimplifyMesh',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'SimplifyMesh',
    description: 'Reduce mesh complexity',
    
    
  },

  params: {
        targetRatio: {
      "default": 0.5,
      "min": 0.01,
      "max": 1,
      "description": "Target triangle ratio"
    },
    preserveBoundaries: {
      "default": true
    },
    preserveTopology: {
      "default": false
    },
    maxError: {
      "default": 0.1,
      "min": 0.001,
      "max": 10
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        simplified: 'Mesh',
    triangleCount: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'simplifyMesh',
      params: {
        mesh: inputs.mesh,
        targetRatio: params.targetRatio,
        preserveBoundaries: params.preserveBoundaries,
        preserveTopology: params.preserveTopology,
        maxError: params.maxError
      }
    });

    return {
      simplified: result,
      triangleCount: result
    };
  }
};
