
import { NodeDefinition } from '@brepflow/types';

interface Params {
  mode: string;
}
interface Inputs {
  string: string;
}
interface Outputs {
  trimmed: string;
}

export const StringTrimNode: NodeDefinition<StringTrimInputs, StringTrimOutputs, StringTrimParams> = {
  type: 'Data::StringTrim',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringTrim',
    description: 'Trim whitespace',
    
    
  },

  params: {
        mode: {
      "default": "both",
      "options": [
        "both",
        "start",
        "end"
      ]
    }
  },

  inputs: {
        string: 'string'
  },

  outputs: {
        trimmed: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringTrim',
      params: {
        string: inputs.string,
        mode: params.mode
      }
    });

    return {
      trimmed: result
    };
  }
};
