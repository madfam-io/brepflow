
import { NodeDefinition } from '@brepflow/types';

interface Params {
  neurons: number;
  connections: number;
}
interface Inputs {
  inputPoints: Point[];
}
interface Outputs {
  network: Wire[];
}

export const NeuralPatternNode: NodeDefinition<NeuralPatternInputs, NeuralPatternOutputs, NeuralPatternParams> = {
  type: 'Patterns::NeuralPattern',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'NeuralPattern',
    description: 'Neural network pattern',
    
    
  },

  params: {
        neurons: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    connections: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        inputPoints: 'Point[]'
  },

  outputs: {
        network: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'neuralPattern',
      params: {
        inputPoints: inputs.inputPoints,
        neurons: params.neurons,
        connections: params.connections
      }
    });

    return {
      network: result
    };
  }
};
