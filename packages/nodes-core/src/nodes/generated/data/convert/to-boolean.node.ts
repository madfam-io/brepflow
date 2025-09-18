
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  data: Data;
}
interface Outputs {
  boolean: boolean;
}

export const ToBooleanNode: NodeDefinition<ToBooleanInputs, ToBooleanOutputs, ToBooleanParams> = {
  type: 'Data::ToBoolean',
  category: 'Data',
  subcategory: 'Convert',

  metadata: {
    label: 'ToBoolean',
    description: 'Convert to boolean',
    
    
  },

  params: {
    
  },

  inputs: {
        data: 'Data'
  },

  outputs: {
        boolean: 'boolean'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'convertToBoolean',
      params: {
        data: inputs.data
        
      }
    });

    return {
      boolean: result
    };
  }
};
