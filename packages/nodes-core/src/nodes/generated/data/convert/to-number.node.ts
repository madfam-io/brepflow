
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  data: Data;
}
interface Outputs {
  number: number;
  isValid: boolean;
}

export const ToNumberNode: NodeDefinition<ToNumberInputs, ToNumberOutputs, ToNumberParams> = {
  type: 'Data::ToNumber',
  category: 'Data',
  subcategory: 'Convert',

  metadata: {
    label: 'ToNumber',
    description: 'Convert to number',
    
    
  },

  params: {
    
  },

  inputs: {
        data: 'Data'
  },

  outputs: {
        number: 'number',
    isValid: 'boolean'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'convertToNumber',
      params: {
        data: inputs.data
        
      }
    });

    return {
      number: result,
      isValid: result
    };
  }
};
