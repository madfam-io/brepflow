
import { NodeDefinition } from '@brepflow/types';

interface Params {
  targetEdgeLength: number;
  iterations: number;
  preserveFeatures: boolean;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  remeshed: Mesh;
}

export const RemeshUniformNode: NodeDefinition<RemeshUniformInputs, RemeshUniformOutputs, RemeshUniformParams> = {
  type: 'Mesh::RemeshUniform',
  category: 'Mesh',
  subcategory: 'Tessellation',

  metadata: {
    label: 'RemeshUniform',
    description: 'Uniform remeshing',
    
    
  },

  params: {
        targetEdgeLength: {
      "default": 1,
      "min": 0.01,
      "max": 100
    },
    iterations: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    preserveFeatures: {
      "default": true
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        remeshed: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'remeshUniform',
      params: {
        mesh: inputs.mesh,
        targetEdgeLength: params.targetEdgeLength,
        iterations: params.iterations,
        preserveFeatures: params.preserveFeatures
      }
    });

    return {
      remeshed: result
    };
  }
};
