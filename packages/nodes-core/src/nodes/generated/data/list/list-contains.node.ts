
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  item: Data;
}
interface Outputs {
  contains: boolean;
  index: number;
}

export const ListContainsNode: NodeDefinition<ListContainsInputs, ListContainsOutputs, ListContainsParams> = {
  type: 'Data::ListContains',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListContains',
    description: 'Check if list contains item',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    item: 'Data'
  },

  outputs: {
        contains: 'boolean',
    index: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listContains',
      params: {
        list: inputs.list,
        item: inputs.item
        
      }
    });

    return {
      contains: result,
      index: result
    };
  }
};
