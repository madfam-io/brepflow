
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const TruncateNode: NodeDefinition<TruncateInputs, TruncateOutputs, TruncateParams> = {
  type: 'Math::Truncate',
  category: 'Math',
  subcategory: 'Rounding',

  metadata: {
    label: 'Truncate',
    description: 'Remove decimal part',
    
    
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
      type: 'mathTrunc',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
