
import { NodeDefinition } from '@brepflow/types';

interface Params {
  targetSize: number;
  minAngle: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  mesh: Mesh;
}

export const DelaunayMeshNode: NodeDefinition<DelaunayMeshInputs, DelaunayMeshOutputs, DelaunayMeshParams> = {
  type: 'Patterns::DelaunayMesh',
  category: 'Patterns',
  subcategory: 'Delaunay',

  metadata: {
    label: 'DelaunayMesh',
    description: 'Quality mesh generation',
    
    
  },

  params: {
        targetSize: {
      "default": 10,
      "min": 0.1
    },
    minAngle: {
      "default": 20,
      "min": 0,
      "max": 60
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        mesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'delaunayMesh',
      params: {
        boundary: inputs.boundary,
        targetSize: params.targetSize,
        minAngle: params.minAngle
      }
    });

    return {
      mesh: result
    };
  }
};
