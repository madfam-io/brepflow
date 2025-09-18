
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  item: Data;
}
interface Outputs {
  result: Data[];
}

export const ListPrependNode: NodeDefinition<ListPrependInputs, ListPrependOutputs, ListPrependParams> = {
  type: 'Data::ListPrepend',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListPrepend',
    description: 'Prepend to list',
    
    
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
      type: 'listPrepend',
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
