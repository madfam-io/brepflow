
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

export const ListInsertNode: NodeDefinition<ListInsertInputs, ListInsertOutputs, ListInsertParams> = {
  type: 'Data::ListInsert',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListInsert',
    description: 'Insert item in list',
    
    
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
      type: 'listInsert',
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
