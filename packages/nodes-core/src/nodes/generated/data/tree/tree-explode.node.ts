
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
}
interface Outputs {
  branches: Data[][];
}

export const TreeExplodeNode: NodeDefinition<TreeExplodeInputs, TreeExplodeOutputs, TreeExplodeParams> = {
  type: 'Data::TreeExplode',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeExplode',
    description: 'Explode tree to branches',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree'
  },

  outputs: {
        branches: 'Data[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeExplode',
      params: {
        tree: inputs.tree
        
      }
    });

    return {
      branches: result
    };
  }
};
