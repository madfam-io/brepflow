
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
}
interface Outputs {
  pruned: DataTree;
}

export const TreePruneNode: NodeDefinition<TreePruneInputs, TreePruneOutputs, TreePruneParams> = {
  type: 'Data::TreePrune',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreePrune',
    description: 'Remove empty branches',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree'
  },

  outputs: {
        pruned: 'DataTree'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treePrune',
      params: {
        tree: inputs.tree
        
      }
    });

    return {
      pruned: result
    };
  }
};
