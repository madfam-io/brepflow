
import { NodeDefinition } from '@brepflow/types';

interface Params {
  caseSensitive: boolean;
}
interface Inputs {
  string: string;
  search: string;
}
interface Outputs {
  contains: boolean;
  index: number;
}

export const StringContainsNode: NodeDefinition<StringContainsInputs, StringContainsOutputs, StringContainsParams> = {
  type: 'Data::StringContains',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringContains',
    description: 'Check if contains',
    
    
  },

  params: {
        caseSensitive: {
      "default": true
    }
  },

  inputs: {
        string: 'string',
    search: 'string'
  },

  outputs: {
        contains: 'boolean',
    index: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringContains',
      params: {
        string: inputs.string,
        search: inputs.search,
        caseSensitive: params.caseSensitive
      }
    });

    return {
      contains: result,
      index: result
    };
  }
};
