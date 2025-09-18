
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  index: number;
}
interface Outputs {
  result: Data[];
  removed: Data;
}

export const ListRemoveNode: NodeDefinition<ListRemoveInputs, ListRemoveOutputs, ListRemoveParams> = {
  type: 'Data::ListRemove',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListRemove',
    description: 'Remove item from list',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    index: 'number'
  },

  outputs: {
        result: 'Data[]',
    removed: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listRemove',
      params: {
        list: inputs.list,
        index: inputs.index
        
      }
    });

    return {
      result: result,
      removed: result
    };
  }
};
