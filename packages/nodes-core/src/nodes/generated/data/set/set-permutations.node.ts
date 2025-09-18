
import { NodeDefinition } from '@brepflow/types';

interface Params {
  k: number;
}
interface Inputs {
  set: Data[];
}
interface Outputs {
  permutations: Data[][];
}

export const SetPermutationsNode: NodeDefinition<SetPermutationsInputs, SetPermutationsOutputs, SetPermutationsParams> = {
  type: 'Data::SetPermutations',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetPermutations',
    description: 'Permutations of set',
    
    
  },

  params: {
        k: {
      "default": -1,
      "min": -1,
      "max": 10
    }
  },

  inputs: {
        set: 'Data[]'
  },

  outputs: {
        permutations: 'Data[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setPermutations',
      params: {
        set: inputs.set,
        k: params.k
      }
    });

    return {
      permutations: result
    };
  }
};
