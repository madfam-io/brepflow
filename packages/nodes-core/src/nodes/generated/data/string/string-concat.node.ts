
import { NodeDefinition } from '@brepflow/types';

interface Params {
  separator: string;
}
interface Inputs {
  strings: string[];
}
interface Outputs {
  result: string;
}

export const StringConcatNode: NodeDefinition<StringConcatInputs, StringConcatOutputs, StringConcatParams> = {
  type: 'Data::StringConcat',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringConcat',
    description: 'Concatenate strings',
    
    
  },

  params: {
        separator: {
      "default": ""
    }
  },

  inputs: {
        strings: 'string[]'
  },

  outputs: {
        result: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringConcat',
      params: {
        strings: inputs.strings,
        separator: params.separator
      }
    });

    return {
      result: result
    };
  }
};
