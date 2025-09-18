
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
  path: string;
}
interface Outputs {
  branch: Data[];
}

export const TreeBranchNode: NodeDefinition<TreeBranchInputs, TreeBranchOutputs, TreeBranchParams> = {
  type: 'Data::TreeBranch',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeBranch',
    description: 'Get tree branch',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree',
    path: 'string'
  },

  outputs: {
        branch: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeBranch',
      params: {
        tree: inputs.tree,
        path: inputs.path
        
      }
    });

    return {
      branch: result
    };
  }
};
