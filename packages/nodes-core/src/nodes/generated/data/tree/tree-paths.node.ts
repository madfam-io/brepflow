
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
}
interface Outputs {
  paths: string[];
}

export const TreePathsNode: NodeDefinition<TreePathsInputs, TreePathsOutputs, TreePathsParams> = {
  type: 'Data::TreePaths',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreePaths',
    description: 'Get all tree paths',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree'
  },

  outputs: {
        paths: 'string[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treePaths',
      params: {
        tree: inputs.tree
        
      }
    });

    return {
      paths: result
    };
  }
};
