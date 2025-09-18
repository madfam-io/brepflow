
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
}
interface Outputs {
  branchCount: number;
  itemCount: number;
  depth: number;
}

export const TreeStatisticsNode: NodeDefinition<TreeStatisticsInputs, TreeStatisticsOutputs, TreeStatisticsParams> = {
  type: 'Data::TreeStatistics',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeStatistics',
    description: 'Tree statistics',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree'
  },

  outputs: {
        branchCount: 'number',
    itemCount: 'number',
    depth: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeStatistics',
      params: {
        tree: inputs.tree
        
      }
    });

    return {
      branchCount: result,
      itemCount: result,
      depth: result
    };
  }
};
