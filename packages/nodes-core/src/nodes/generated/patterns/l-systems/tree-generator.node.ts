
import { NodeDefinition } from '@brepflow/types';

interface Params {
  treeType: string;
  height: number;
  branches: number;
  seed: number;
}
interface Inputs {
  base: Point;
}
interface Outputs {
  trunk: Wire[];
  leaves: Point[];
}

export const TreeGeneratorNode: NodeDefinition<TreeGeneratorInputs, TreeGeneratorOutputs, TreeGeneratorParams> = {
  type: 'Patterns::TreeGenerator',
  category: 'Patterns',
  subcategory: 'L-Systems',

  metadata: {
    label: 'TreeGenerator',
    description: 'Parametric tree generator',
    
    
  },

  params: {
        treeType: {
      "default": "oak",
      "options": [
        "oak",
        "pine",
        "willow",
        "palm",
        "fractal"
      ]
    },
    height: {
      "default": 100,
      "min": 10
    },
    branches: {
      "default": 5,
      "min": 2,
      "max": 10,
      "step": 1
    },
    seed: {
      "default": 0,
      "min": 0,
      "max": 999999
    }
  },

  inputs: {
        base: 'Point'
  },

  outputs: {
        trunk: 'Wire[]',
    leaves: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeGenerator',
      params: {
        base: inputs.base,
        treeType: params.treeType,
        height: params.height,
        branches: params.branches,
        seed: params.seed
      }
    });

    return {
      trunk: result,
      leaves: result
    };
  }
};
