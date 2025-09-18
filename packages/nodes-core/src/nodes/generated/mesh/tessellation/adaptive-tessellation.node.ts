
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minEdgeLength: number;
  maxEdgeLength: number;
  curvatureFactor: number;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  mesh: Mesh;
}

export const AdaptiveTessellationNode: NodeDefinition<AdaptiveTessellationInputs, AdaptiveTessellationOutputs, AdaptiveTessellationParams> = {
  type: 'Mesh::AdaptiveTessellation',
  category: 'Mesh',
  subcategory: 'Tessellation',

  metadata: {
    label: 'AdaptiveTessellation',
    description: 'Adaptive mesh generation',
    
    
  },

  params: {
        minEdgeLength: {
      "default": 0.1,
      "min": 0.001,
      "max": 100
    },
    maxEdgeLength: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    curvatureFactor: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        mesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'adaptiveTessellate',
      params: {
        shape: inputs.shape,
        minEdgeLength: params.minEdgeLength,
        maxEdgeLength: params.maxEdgeLength,
        curvatureFactor: params.curvatureFactor
      }
    });

    return {
      mesh: result
    };
  }
};
