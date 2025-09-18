
import { NodeDefinition } from '@brepflow/types';

interface Params {
  subdivisionType: string;
  levels: number;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  subdivided: Mesh;
}

export const SubdivideMeshNode: NodeDefinition<SubdivideMeshInputs, SubdivideMeshOutputs, SubdivideMeshParams> = {
  type: 'Mesh::SubdivideMesh',
  category: 'Mesh',
  subcategory: 'Repair',

  metadata: {
    label: 'SubdivideMesh',
    description: 'Subdivide mesh faces',
    
    
  },

  params: {
        subdivisionType: {
      "default": "loop",
      "options": [
        "loop",
        "catmull-clark",
        "simple"
      ]
    },
    levels: {
      "default": 1,
      "min": 1,
      "max": 5,
      "step": 1
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        subdivided: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'subdivideMesh',
      params: {
        mesh: inputs.mesh,
        subdivisionType: params.subdivisionType,
        levels: params.levels
      }
    });

    return {
      subdivided: result
    };
  }
};
