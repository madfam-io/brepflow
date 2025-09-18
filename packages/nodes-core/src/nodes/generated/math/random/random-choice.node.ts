
import { NodeDefinition } from '@brepflow/types';

interface Params {
  seed: number;
}
interface Inputs {
  choices: Data[];
}
interface Outputs {
  choice: Data;
}

export const RandomChoiceNode: NodeDefinition<RandomChoiceInputs, RandomChoiceOutputs, RandomChoiceParams> = {
  type: 'Math::RandomChoice',
  category: 'Math',
  subcategory: 'Random',

  metadata: {
    label: 'RandomChoice',
    description: 'Random choice from list',
    
    
  },

  params: {
        seed: {
      "default": -1,
      "min": -1,
      "max": 999999
    }
  },

  inputs: {
        choices: 'Data[]'
  },

  outputs: {
        choice: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathRandomChoice',
      params: {
        choices: inputs.choices,
        seed: params.seed
      }
    });

    return {
      choice: result
    };
  }
};
