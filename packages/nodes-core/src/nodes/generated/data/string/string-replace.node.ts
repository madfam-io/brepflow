
import { NodeDefinition } from '@brepflow/types';

interface Params {
  global: boolean;
}
interface Inputs {
  string: string;
  search: string;
  replace: string;
}
interface Outputs {
  result: string;
}

export const StringReplaceNode: NodeDefinition<StringReplaceInputs, StringReplaceOutputs, StringReplaceParams> = {
  type: 'Data::StringReplace',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringReplace',
    description: 'Replace in string',
    
    
  },

  params: {
        global: {
      "default": true
    }
  },

  inputs: {
        string: 'string',
    search: 'string',
    replace: 'string'
  },

  outputs: {
        result: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringReplace',
      params: {
        string: inputs.string,
        search: inputs.search,
        replace: inputs.replace,
        global: params.global
      }
    });

    return {
      result: result
    };
  }
};
