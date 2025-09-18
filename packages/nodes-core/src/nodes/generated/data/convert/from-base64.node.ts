
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  base64: string;
}
interface Outputs {
  data: Data;
}

export const FromBase64Node: NodeDefinition<FromBase64Inputs, FromBase64Outputs, FromBase64Params> = {
  type: 'Data::FromBase64',
  category: 'Data',
  subcategory: 'Convert',

  metadata: {
    label: 'FromBase64',
    description: 'Decode from Base64',
    
    
  },

  params: {
    
  },

  inputs: {
        base64: 'string'
  },

  outputs: {
        data: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'convertFromBase64',
      params: {
        base64: inputs.base64
        
      }
    });

    return {
      data: result
    };
  }
};
