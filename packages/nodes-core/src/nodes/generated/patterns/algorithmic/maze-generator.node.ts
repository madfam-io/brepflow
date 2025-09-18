
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  width: number;
  height: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  walls: Wire[];
  path: Wire;
}

export const MazeGeneratorNode: NodeDefinition<MazeGeneratorInputs, MazeGeneratorOutputs, MazeGeneratorParams> = {
  type: 'Patterns::MazeGenerator',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'MazeGenerator',
    description: 'Maze generation algorithms',
    
    
  },

  params: {
        algorithm: {
      "default": "recursive-backtracker",
      "options": [
        "recursive-backtracker",
        "prims",
        "kruskals",
        "wilsons"
      ]
    },
    width: {
      "default": 20,
      "min": 5,
      "max": 100,
      "step": 1
    },
    height: {
      "default": 20,
      "min": 5,
      "max": 100,
      "step": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        walls: 'Wire[]',
    path: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mazeGenerator',
      params: {
        boundary: inputs.boundary,
        algorithm: params.algorithm,
        width: params.width,
        height: params.height
      }
    });

    return {
      walls: result,
      path: result
    };
  }
};
