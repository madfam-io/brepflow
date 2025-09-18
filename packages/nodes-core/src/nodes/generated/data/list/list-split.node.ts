
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  list: Data[];
  index: number;
}
interface Outputs {
  before: Data[];
  after: Data[];
}

export const ListSplitNode: NodeDefinition<ListSplitInputs, ListSplitOutputs, ListSplitParams> = {
  type: 'Data::ListSplit',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListSplit',
    description: 'Split list',
    
    
  },

  params: {
    
  },

  inputs: {
        list: 'Data[]',
    index: 'number'
  },

  outputs: {
        before: 'Data[]',
    after: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listSplit',
      params: {
        list: inputs.list,
        index: inputs.index
        
      }
    });

    return {
      before: result,
      after: result
    };
  }
};
