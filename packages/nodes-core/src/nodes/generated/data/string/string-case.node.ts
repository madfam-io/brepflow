
import { NodeDefinition } from '@brepflow/types';

interface Params {
  case: string;
}
interface Inputs {
  string: string;
}
interface Outputs {
  result: string;
}

export const StringCaseNode: NodeDefinition<StringCaseInputs, StringCaseOutputs, StringCaseParams> = {
  type: 'Data::StringCase',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringCase',
    description: 'Change string case',
    
    
  },

  params: {
        case: {
      "default": "lower",
      "options": [
        "upper",
        "lower",
        "title",
        "camel",
        "snake"
      ]
    }
  },

  inputs: {
        string: 'string'
  },

  outputs: {
        result: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringCase',
      params: {
        string: inputs.string,
        case: params.case
      }
    });

    return {
      result: result
    };
  }
};
