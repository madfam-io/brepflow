
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
}
interface Outputs {
  simplified: DataTree;
}

export const TreeSimplifyNode: NodeDefinition<TreeSimplifyInputs, TreeSimplifyOutputs, TreeSimplifyParams> = {
  type: 'Data::TreeSimplify',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeSimplify',
    description: 'Simplify tree paths',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree'
  },

  outputs: {
        simplified: 'DataTree'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeSimplify',
      params: {
        tree: inputs.tree
        
      }
    });

    return {
      simplified: result
    };
  }
};
