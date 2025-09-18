
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

export const ShuffleNode: NodeDefinition<ShuffleInputs, ShuffleOutputs, ShuffleParams> = {
  type: 'Math::Shuffle',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'Shuffle',
    description: 'Shuffle list randomly',
    
    
  },

  params: {
        seed: {
      "default": -1,
      "min": -1,
      "max": 999999
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
      type: 'mathShuffle',
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
