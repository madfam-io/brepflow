
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  treeA: DataTree;
  treeB: DataTree;
}
interface Outputs {
  merged: DataTree;
}

export const TreeMergeNode: NodeDefinition<TreeMergeInputs, TreeMergeOutputs, TreeMergeParams> = {
  type: 'Data::TreeMerge',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeMerge',
    description: 'Merge trees',
    
    
  },

  params: {
    
  },

  inputs: {
        treeA: 'DataTree',
    treeB: 'DataTree'
  },

  outputs: {
        merged: 'DataTree'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeMerge',
      params: {
        treeA: inputs.treeA,
        treeB: inputs.treeB
        
      }
    });

    return {
      merged: result
    };
  }
};
