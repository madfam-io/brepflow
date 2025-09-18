
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  sign: number;
}

export const SignNode: NodeDefinition<SignInputs, SignOutputs, SignParams> = {
  type: 'Math::Sign',
  category: 'Math',
  subcategory: 'Comparison',

  metadata: {
    label: 'Sign',
    description: 'Sign of number',
    
    
  },

  params: {
    
  },

  inputs: {
        value: 'number'
  },

  outputs: {
        sign: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathSign',
      params: {
        value: inputs.value
        
      }
    });

    return {
      sign: result
    };
  }
};
