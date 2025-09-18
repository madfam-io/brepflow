
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  item: Data;
}
interface Outputs {
  result: Data[];
}

export const ListAppendNode: NodeDefinition<ListAppendInputs, ListAppendOutputs, ListAppendParams> = {
  type: 'Data::ListAppend',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListAppend',
    description: 'Append to list',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    item: 'Data'
  },

  outputs: {
        result: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listAppend',
      params: {
        list: inputs.list,
        item: inputs.item
        
      }
    });

    return {
      result: result
    };
  }
};
