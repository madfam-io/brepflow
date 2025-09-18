
import { NodeDefinition } from '@brepflow/types';

interface Params {
  states: number;
  steps: number;
  seed: number;
}
interface Inputs {
  transitionMatrix: Data;
}
interface Outputs {
  sequence: Number[];
  pattern: Wire;
}

export const MarkovChainNode: NodeDefinition<MarkovChainInputs, MarkovChainOutputs, MarkovChainParams> = {
  type: 'Patterns::MarkovChain',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'MarkovChain',
    description: 'Markov chain pattern',
    
    
  },

  params: {
        states: {
      "default": 5,
      "min": 2,
      "max": 10,
      "step": 1
    },
    steps: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    seed: {
      "default": 0,
      "min": 0,
      "max": 999999
    }
  },

  inputs: {
        transitionMatrix: 'Data'
  },

  outputs: {
        sequence: 'Number[]',
    pattern: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'markovChain',
      params: {
        transitionMatrix: inputs.transitionMatrix,
        states: params.states,
        steps: params.steps,
        seed: params.seed
      }
    });

    return {
      sequence: result,
      pattern: result
    };
  }
};
