
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  iterations: number;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  subdivided: Mesh;
}

export const SubdivisionSurfaceNode: NodeDefinition<SubdivisionSurfaceInputs, SubdivisionSurfaceOutputs, SubdivisionSurfaceParams> = {
  type: 'Patterns::SubdivisionSurface',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'SubdivisionSurface',
    description: 'Subdivision surface algorithms',
    
    
  },

  params: {
        algorithm: {
      "default": "catmull-clark",
      "options": [
        "catmull-clark",
        "loop",
        "doo-sabin",
        "butterfly"
      ]
    },
    iterations: {
      "default": 2,
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
      type: 'subdivisionSurface',
      params: {
        mesh: inputs.mesh,
        algorithm: params.algorithm,
        iterations: params.iterations
      }
    });

    return {
      subdivided: result
    };
  }
};
