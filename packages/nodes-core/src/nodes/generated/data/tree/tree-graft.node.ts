
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
}
interface Outputs {
  grafted: DataTree;
}

export const TreeGraftNode: NodeDefinition<TreeGraftInputs, TreeGraftOutputs, TreeGraftParams> = {
  type: 'Data::TreeGraft',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeGraft',
    description: 'Graft tree',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree'
  },

  outputs: {
        grafted: 'DataTree'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeGraft',
      params: {
        tree: inputs.tree
        
      }
    });

    return {
      grafted: result
    };
  }
};
