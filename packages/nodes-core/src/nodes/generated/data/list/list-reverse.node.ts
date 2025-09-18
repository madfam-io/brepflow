
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
}
interface Outputs {
  reversed: Data[];
}

export const ListReverseNode: NodeDefinition<ListReverseInputs, ListReverseOutputs, ListReverseParams> = {
  type: 'Data::ListReverse',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListReverse',
    description: 'Reverse list order',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]'
  },

  outputs: {
        reversed: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listReverse',
      params: {
        list: inputs.list
        
      }
    });

    return {
      reversed: result
    };
  }
};
