
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
  base: number;
}
interface Outputs {
  result: number;
}

export const LogBaseNode: NodeDefinition<LogBaseInputs, LogBaseOutputs, LogBaseParams> = {
  type: 'Math::LogBase',
  category: 'Math',
  subcategory: 'Logarithmic',

  metadata: {
    label: 'LogBase',
    description: 'Logarithm with custom base',
    
    
  },

  params: {
    
  },

  inputs: {
        value: 'number',
    base: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathLogBase',
      params: {
        value: inputs.value,
        base: inputs.base
        
      }
    });

    return {
      result: result
    };
  }
};
