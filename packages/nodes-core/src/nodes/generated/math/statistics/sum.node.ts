
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  sum: number;
}

export const SumNode: NodeDefinition<SumInputs, SumOutputs, SumParams> = {
  type: 'Math::Sum',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Sum',
    description: 'Sum of values',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        sum: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathSum',
      params: {
        values: inputs.values
        
      }
    });

    return {
      sum: result
    };
  }
};
