
import { NodeDefinition } from '@brepflow/types';

interface Params {
  alpha: number;
  mode: string;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  shape: Shape;
  boundary: Wire[];
  simplices: Properties[];
}

export const AlphaShapeNode: NodeDefinition<AlphaShapeInputs, AlphaShapeOutputs, AlphaShapeParams> = {
  type: 'Algorithmic::AlphaShape',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'AlphaShape',
    description: 'Generate alpha shape from point cloud',
    
    
  },

  params: {
        alpha: {
      "default": 1,
      "min": 0.1,
      "max": 100
    },
    mode: {
      "default": "3D",
      "options": [
        "3D",
        "2D"
      ]
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        shape: 'Shape',
    boundary: 'Wire[]',
    simplices: 'Properties[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'alphaShape',
      params: {
        points: inputs.points,
        alpha: params.alpha,
        mode: params.mode
      }
    });

    return {
      shape: result,
      boundary: result,
      simplices: result
    };
  }
};
