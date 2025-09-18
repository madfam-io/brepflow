
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
}
interface Outputs {
  length: number;
}

export const ListLengthNode: NodeDefinition<ListLengthInputs, ListLengthOutputs, ListLengthParams> = {
  type: 'Data::ListLength',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListLength',
    description: 'Get list length',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]'
  },

  outputs: {
        length: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listLength',
      params: {
        list: inputs.list
        
      }
    });

    return {
      length: result
    };
  }
};
