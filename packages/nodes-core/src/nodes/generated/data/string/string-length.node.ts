
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  string: string;
}
interface Outputs {
  length: number;
}

export const StringLengthNode: NodeDefinition<StringLengthInputs, StringLengthOutputs, StringLengthParams> = {
  type: 'Data::StringLength',
  category: 'Data',
  subcategory: 'String',

  metadata: {
    label: 'StringLength',
    description: 'String length',
    
    
  },

  params: {
    
  },

  inputs: {
        string: 'string'
  },

  outputs: {
        length: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stringLength',
      params: {
        string: inputs.string
        
      }
    });

    return {
      length: result
    };
  }
};
