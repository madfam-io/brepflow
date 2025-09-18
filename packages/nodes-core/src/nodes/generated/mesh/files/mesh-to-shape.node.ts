
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  sewFaces: boolean;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  shape: Shape;
}

export const MeshToShapeNode: NodeDefinition<MeshToShapeInputs, MeshToShapeOutputs, MeshToShapeParams> = {
  type: 'Mesh::MeshToShape',
  category: 'Mesh',
  subcategory: 'Files',

  metadata: {
    label: 'MeshToShape',
    description: 'Convert mesh to B-Rep',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    },
    sewFaces: {
      "default": true
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'meshToShape',
      params: {
        mesh: inputs.mesh,
        tolerance: params.tolerance,
        sewFaces: params.sewFaces
      }
    });

    return {
      shape: result
    };
  }
};
