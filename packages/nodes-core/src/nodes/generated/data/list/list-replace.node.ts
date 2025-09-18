
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  item: Data;
  index: number;
}
interface Outputs {
  result: Data[];
}

export const ListReplaceNode: NodeDefinition<ListReplaceInputs, ListReplaceOutputs, ListReplaceParams> = {
  type: 'Data::ListReplace',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListReplace',
    description: 'Replace item in list',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    item: 'Data',
    index: 'number'
  },

  outputs: {
        result: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listReplace',
      params: {
        list: inputs.list,
        item: inputs.item,
        index: inputs.index
        
      }
    });

    return {
      result: result
    };
  }
};
