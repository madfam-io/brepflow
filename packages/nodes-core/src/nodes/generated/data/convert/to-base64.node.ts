
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  data: Data;
}
interface Outputs {
  base64: string;
}

export const ToBase64Node: NodeDefinition<ToBase64Inputs, ToBase64Outputs, ToBase64Params> = {
  type: 'Data::ToBase64',
  category: 'Data',
  subcategory: 'Convert',

  metadata: {
    label: 'ToBase64',
    description: 'Encode to Base64',
    
    
  },

  params: {
    
  },

  inputs: {
        data: 'Data'
  },

  outputs: {
        base64: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'convertToBase64',
      params: {
        data: inputs.data
        
      }
    });

    return {
      base64: result
    };
  }
};
