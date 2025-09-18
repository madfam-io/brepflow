
import { NodeDefinition } from '@brepflow/types';

interface Params {
  offsetDistance: number;
  solidify: boolean;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  offset: Mesh;
}

export const MeshOffsetNode: NodeDefinition<MeshOffsetInputs, MeshOffsetOutputs, MeshOffsetParams> = {
  type: 'Mesh::MeshOffset',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'MeshOffset',
    description: 'Offset mesh surface',
    
    
  },

  params: {
        offsetDistance: {
      "default": 1,
      "min": -100,
      "max": 100
    },
    solidify: {
      "default": false
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        offset: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'meshOffset',
      params: {
        mesh: inputs.mesh,
        offsetDistance: params.offsetDistance,
        solidify: params.solidify
      }
    });

    return {
      offset: result
    };
  }
};
