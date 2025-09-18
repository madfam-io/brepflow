
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const Log10Node: NodeDefinition<Log10Inputs, Log10Outputs, Log10Params> = {
  type: 'Math::Log10',
  category: 'Math',
  subcategory: 'Logarithmic',

  metadata: {
    label: 'Log10',
    description: 'Base-10 logarithm',
    
    
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
      type: 'mathLog10',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
