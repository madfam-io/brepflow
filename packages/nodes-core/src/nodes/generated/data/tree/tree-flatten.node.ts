
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
}
interface Inputs {
  tree: DataTree;
}
interface Outputs {
  flattened: DataTree;
}

export const TreeFlattenNode: NodeDefinition<TreeFlattenInputs, TreeFlattenOutputs, TreeFlattenParams> = {
  type: 'Data::TreeFlatten',
  category: 'Data',
  subcategory: 'Tree',

  metadata: {
    label: 'TreeFlatten',
    description: 'Flatten tree',
    
    
  },

  params: {
        depth: {
      "default": 1,
      "min": 0,
      "max": 10
    }
  },

  inputs: {
        tree: 'DataTree'
  },

  outputs: {
        flattened: 'DataTree'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'treeFlatten',
      params: {
        tree: inputs.tree,
        depth: params.depth
      }
    });

    return {
      flattened: result
    };
  }
};
