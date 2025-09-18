
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  tree: DataTree;
  offset: number;
}
interface Outputs {
  shifted: DataTree;
}

export const TreeShiftNode: NodeDefinition<TreeShiftInputs, TreeShiftOutputs, TreeShiftParams> = {
  type: 'Data::TreeShift',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeShift',
    description: 'Shift tree paths',
    
    
  },

  params: {
    
  },

  inputs: {
        tree: 'DataTree',
    offset: 'number'
  },

  outputs: {
        shifted: 'DataTree'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeShift',
      params: {
        tree: inputs.tree,
        offset: inputs.offset
        
      }
    });

    return {
      shifted: result
    };
  }
};
