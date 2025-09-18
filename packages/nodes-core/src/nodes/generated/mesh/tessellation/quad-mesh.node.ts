
import { NodeDefinition } from '@brepflow/types';

interface Params {
  targetQuadSize: number;
  quadDominance: number;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  quadMesh: Mesh;
}

export const QuadMeshNode: NodeDefinition<QuadMeshInputs, QuadMeshOutputs, QuadMeshParams> = {
  type: 'Mesh::QuadMesh',
  category: 'Mesh',
  subcategory: 'Tessellation',

  metadata: {
    label: 'QuadMesh',
    description: 'Generate quad-dominant mesh',
    
    
  },

  params: {
        targetQuadSize: {
      "default": 5,
      "min": 0.1,
      "max": 100
    },
    quadDominance: {
      "default": 0.8,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        quadMesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'quadMesh',
      params: {
        shape: inputs.shape,
        targetQuadSize: params.targetQuadSize,
        quadDominance: params.quadDominance
      }
    });

    return {
      quadMesh: result
    };
  }
};
