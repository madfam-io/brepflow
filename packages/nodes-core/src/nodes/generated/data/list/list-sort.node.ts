
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ascending: boolean;
}
interface Inputs {
  list: Data[];
  keys?: number[];
}
interface Outputs {
  sorted: Data[];
  indices: number[];
}

export const ListSortNode: NodeDefinition<ListSortInputs, ListSortOutputs, ListSortParams> = {
  type: 'Data::ListSort',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListSort',
    description: 'Sort list',
    
    
  },

  params: {
        ascending: {
      "default": true
    }
  },

  inputs: {
        list: 'Data[]',
    keys: 'number[]'
  },

  outputs: {
        sorted: 'Data[]',
    indices: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listSort',
      params: {
        list: inputs.list,
        keys: inputs.keys,
        ascending: params.ascending
      }
    });

    return {
      sorted: result,
      indices: result
    };
  }
};
