
import { NodeDefinition } from '@brepflow/types';

interface Params {
  operation: string;
  tolerance: number;
}
interface Inputs {
  mesh1: Mesh;
  mesh2: Mesh;
}
interface Outputs {
  result: Mesh;
}

export const MeshBooleanNode: NodeDefinition<MeshBooleanInputs, MeshBooleanOutputs, MeshBoolParams> = {
  type: 'Mesh::MeshBoolean',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'MeshBoolean',
    description: 'Boolean operations on meshes',
    
    
  },

  params: {
        operation: {
      "default": "union",
      "options": [
        "union",
        "difference",
        "intersection"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    }
  },

  inputs: {
        mesh1: 'Mesh',
    mesh2: 'Mesh'
  },

  outputs: {
        result: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'meshBoolean',
      params: {
        mesh1: inputs.mesh1,
        mesh2: inputs.mesh2,
        operation: params.operation,
        tolerance: params.tolerance
      }
    });

    return {
      result: result
    };
  }
};
