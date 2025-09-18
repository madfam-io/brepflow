
import { NodeDefinition } from '@brepflow/types';

interface Params {
  delimiter: string;
}
interface Inputs {
  string: string;
}
interface Outputs {
  parts: string[];
}

export const StringSplitNode: NodeDefinition<StringSplitInputs, StringSplitOutputs, StringSplitParams> = {
  type: 'Data::StringSplit',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringSplit',
    description: 'Split string',
    
    
  },

  params: {
        delimiter: {
      "default": ","
    }
  },

  inputs: {
        string: 'string'
  },

  outputs: {
        parts: 'string[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringSplit',
      params: {
        string: inputs.string,
        delimiter: params.delimiter
      }
    });

    return {
      parts: result
    };
  }
};
