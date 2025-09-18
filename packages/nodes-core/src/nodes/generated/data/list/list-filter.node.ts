
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  mask: boolean[];
}
interface Outputs {
  filtered: Data[];
}

export const ListFilterNode: NodeDefinition<ListFilterInputs, ListFilterOutputs, ListFilterParams> = {
  type: 'Data::ListFilter',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListFilter',
    description: 'Filter list by condition',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    mask: 'boolean[]'
  },

  outputs: {
        filtered: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listFilter',
      params: {
        list: inputs.list,
        mask: inputs.mask
        
      }
    });

    return {
      filtered: result
    };
  }
};
