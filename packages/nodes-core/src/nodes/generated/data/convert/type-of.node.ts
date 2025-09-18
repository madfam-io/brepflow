
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  data: Data;
}
interface Outputs {
  type: string;
}

export const TypeOfNode: NodeDefinition<TypeOfInputs, TypeOfOutputs, TypeOfParams> = {
  type: 'Data::TypeOf',
  category: 'Data',
  subcategory: 'Convert',

  metadata: {
    label: 'TypeOf',
    description: 'Get data type',
    
    
  },

  params: {
    
  },

  inputs: {
        data: 'Data'
  },

  outputs: {
        type: 'string'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'typeOf',
      params: {
        data: inputs.data
        
      }
    });

    return {
      type: result
    };
  }
};
