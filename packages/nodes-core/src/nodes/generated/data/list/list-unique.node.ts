
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
}
interface Outputs {
  unique: Data[];
}

export const ListUniqueNode: NodeDefinition<ListUniqueInputs, ListUniqueOutputs, ListUniqueParams> = {
  type: 'Data::ListUnique',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListUnique',
    description: 'Remove duplicates',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]'
  },

  outputs: {
        unique: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listUnique',
      params: {
        list: inputs.list
        
      }
    });

    return {
      unique: result
    };
  }
};
