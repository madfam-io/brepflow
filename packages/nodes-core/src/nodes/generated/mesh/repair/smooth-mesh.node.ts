
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
  smoothingFactor: number;
  preserveVolume: boolean;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  smoothed: Mesh;
}

export const SmoothMeshNode: NodeDefinition<SmoothMeshInputs, SmoothMeshOutputs, SmoothMeshParams> = {
  type: 'Mesh::SmoothMesh',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'SmoothMesh',
    description: 'Smooth mesh surface',
    
    
  },

  params: {
        iterations: {
      "default": 5,
      "min": 1,
      "max": 100,
      "step": 1
    },
    smoothingFactor: {
      "default": 0.5,
      "min": 0,
      "max": 1
    },
    preserveVolume: {
      "default": true
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        smoothed: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'smoothMesh',
      params: {
        mesh: inputs.mesh,
        iterations: params.iterations,
        smoothingFactor: params.smoothingFactor,
        preserveVolume: params.preserveVolume
      }
    });

    return {
      smoothed: result
    };
  }
};
