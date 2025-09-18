
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const ExponentialNode: NodeDefinition<ExponentialInputs, ExponentialOutputs, ExponentialParams> = {
  type: 'Math::Exponential',
  category: 'Math',
  subcategory: 'Logarithmic',

  metadata: {
    label: 'Exponential',
    description: 'Exponential function',
    
    
  },

  params: {
    
  },

  inputs: {
        value: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathExp',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
