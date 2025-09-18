
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const NegateNode: NodeDefinition<NegateInputs, NegateOutputs, NegateParams> = {
  type: 'Math::Negate',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Negate',
    description: 'Negate value',
    
    
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
      type: 'mathNegate',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
