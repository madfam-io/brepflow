
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  string: string;
  start: number;
  length?: number;
}
interface Outputs {
  substring: string;
}

export const StringSubstringNode: NodeDefinition<StringSubstringInputs, StringSubstringOutputs, StringSubstringParams> = {
  type: 'Data::StringSubstring',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringSubstring',
    description: 'Extract substring',
    
    
  },

  params: {
    
  },

  inputs: {
        string: 'string',
    start: 'number',
    length: 'number'
  },

  outputs: {
        substring: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringSubstring',
      params: {
        string: inputs.string,
        start: inputs.start,
        length: inputs.length
        
      }
    });

    return {
      substring: result
    };
  }
};
