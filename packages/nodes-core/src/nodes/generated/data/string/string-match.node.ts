
import { NodeDefinition } from '@brepflow/types';

interface Params {
  global: boolean;
}
interface Inputs {
  string: string;
  pattern: string;
}
interface Outputs {
  matches: string[];
}

export const StringMatchNode: NodeDefinition<StringMatchInputs, StringMatchOutputs, StringMatchParams> = {
  type: 'Data::StringMatch',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringMatch',
    description: 'Match with regex',
    
    
  },

  params: {
        global: {
      "default": false
    }
  },

  inputs: {
        string: 'string',
    pattern: 'string'
  },

  outputs: {
        matches: 'string[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringMatch',
      params: {
        string: inputs.string,
        pattern: inputs.pattern,
        global: params.global
      }
    });

    return {
      matches: result
    };
  }
};
