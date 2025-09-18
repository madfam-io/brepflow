
import { NodeDefinition } from '@brepflow/types';

interface Params {
  k: number;
}
interface Inputs {
  set: Data[];
}
interface Outputs {
  combinations: Data[][];
}

export const SetCombinationsNode: NodeDefinition<SetCombinationsInputs, SetCombinationsOutputs, SetCombinationsParams> = {
  type: 'Data::SetCombinations',
  category: 'Data',
  subcategory: 'Set',

  metadata: {
    label: 'SetCombinations',
    description: 'Combinations of set',
    
    
  },

  params: {
        k: {
      "default": 2,
      "min": 1,
      "max": 10
    }
  },

  inputs: {
        set: 'Data[]'
  },

  outputs: {
        combinations: 'Data[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'setCombinations',
      params: {
        set: inputs.set,
        k: params.k
      }
    });

    return {
      combinations: result
    };
  }
};
