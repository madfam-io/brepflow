
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const RoundNode: NodeDefinition<RoundInputs, RoundOutputs, RoundParams> = {
  type: 'Math::Round',
  category: 'Math',
  subcategory: 'Rounding',

  metadata: {
    label: 'Round',
    description: 'Round to nearest integer',
    
    
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
      type: 'mathRound',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
