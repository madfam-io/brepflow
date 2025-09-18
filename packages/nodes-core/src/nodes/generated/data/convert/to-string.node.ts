
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  data: Data;
}
interface Outputs {
  string: string;
}

export const ToStringNode: NodeDefinition<ToStringInputs, ToStringOutputs, ToStringParams> = {
  type: 'Data::ToString',
  category: 'Data',
  subcategory: 'Convert',

  metadata: {
    label: 'ToString',
    description: 'Convert to string',
    
    
  },

  params: {
    
  },

  inputs: {
        data: 'Data'
  },

  outputs: {
        string: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'convertToString',
      params: {
        data: inputs.data
        
      }
    });

    return {
      string: result
    };
  }
};
