
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
  branchAngle: number;
  lengthRatio: number;
}
interface Inputs {
  root: Point;
}
interface Outputs {
  tree: Wire[];
}

export const BinaryTreeNode: NodeDefinition<BinaryTreeInputs, BinaryTreeOutputs, BinaryTreeParams> = {
  type: 'Patterns::BinaryTree',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'BinaryTree',
    description: 'Binary tree structure',
    
    
  },

  params: {
        depth: {
      "default": 5,
      "min": 1,
      "max": 10,
      "step": 1
    },
    branchAngle: {
      "default": 30,
      "min": 0,
      "max": 90
    },
    lengthRatio: {
      "default": 0.7,
      "min": 0.3,
      "max": 0.9
    }
  },

  inputs: {
        root: 'Point'
  },

  outputs: {
        tree: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'binaryTree',
      params: {
        root: inputs.root,
        depth: params.depth,
        branchAngle: params.branchAngle,
        lengthRatio: params.lengthRatio
      }
    });

    return {
      tree: result
    };
  }
};
