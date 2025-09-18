
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  template: string;
  values: Data[];
}
interface Outputs {
  formatted: string;
}

export const StringFormatNode: NodeDefinition<StringFormatInputs, StringFormatOutputs, StringFormatParams> = {
  type: 'Data::StringFormat',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringFormat',
    description: 'Format string',
    
    
  },

  params: {
    
  },

  inputs: {
        template: 'string',
    values: 'Data[]'
  },

  outputs: {
        formatted: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringFormat',
      params: {
        template: inputs.template,
        values: inputs.values
        
      }
    });

    return {
      formatted: result
    };
  }
};
