
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  lists: Data[][];
}
interface Outputs {
  joined: Data[];
}

export const ListJoinNode: NodeDefinition<ListJoinInputs, ListJoinOutputs, ListJoinParams> = {
  type: 'Data::ListJoin',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListJoin',
    description: 'Join multiple lists',
    
    
  },

  params: {
    
  },

  inputs: {
        lists: 'Data[][]'
  },

  outputs: {
        joined: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listJoin',
      params: {
        lists: inputs.lists
        
      }
    });

    return {
      joined: result
    };
  }
};
