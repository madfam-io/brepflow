
import { NodeDefinition } from '@brepflow/types';

interface Params {
  alpha: number;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  shape: Wire;
  mesh: Mesh;
}

export const AlphaShapeNode: NodeDefinition<AlphaShapeInputs, AlphaShapeOutputs, AlphaShapeParams> = {
  type: 'Patterns::AlphaShape',
  category: 'Patterns',
  subcategory: 'Delaunay',

  metadata: {
    label: 'AlphaShape',
    description: 'Alpha shape from points',
    
    
  },

  params: {
        alpha: {
      "default": 1,
      "min": 0
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        shape: 'Wire',
    mesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'alphaShape',
      params: {
        points: inputs.points,
        alpha: params.alpha
      }
    });

    return {
      shape: result,
      mesh: result
    };
  }
};
