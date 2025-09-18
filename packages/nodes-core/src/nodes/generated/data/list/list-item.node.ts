
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wrap: boolean;
}
interface Inputs {
  list: Data[];
  index: number;
}
interface Outputs {
  item: Data;
}

export const ListItemNode: NodeDefinition<ListItemInputs, ListItemOutputs, ListItemParams> = {
  type: 'Data::ListItem',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListItem',
    description: 'Get item at index',
    
    
  },

  params: {
        wrap: {
      "default": false
    }
  },

  inputs: {
        list: 'Data[]',
    index: 'number'
  },

  outputs: {
        item: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listItem',
      params: {
        list: inputs.list,
        index: inputs.index,
        wrap: params.wrap
      }
    });

    return {
      item: result
    };
  }
};
