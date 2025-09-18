
import { NodeDefinition } from '@brepflow/types';

interface Params {
  seed: number;
}
interface Inputs {
  list: Data[];
}
interface Outputs {
  shuffled: Data[];
}

export const ListShuffleNode: NodeDefinition<ListShuffleInputs, ListShuffleOutputs, ListShuffleParams> = {
  type: 'Data::ListShuffle',
  category: 'Data',
  subcategory: 'List',

  metadata: {
    label: 'ListShuffle',
    description: 'Randomize list order',
    
    
  },

  params: {
        seed: {
      "default": -1
    }
  },

  inputs: {
        list: 'Data[]'
  },

  outputs: {
        shuffled: 'Data[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'listShuffle',
      params: {
        list: inputs.list,
        seed: params.seed
      }
    });

    return {
      shuffled: result
    };
  }
};
