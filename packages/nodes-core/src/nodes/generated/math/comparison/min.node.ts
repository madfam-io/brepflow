
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  min: number;
}

export const MinNode: NodeDefinition<MinInputs, MinOutputs, MinParams> = {
  type: 'Math::Min',
  category: 'Math',
  subcategory: 'Comparison',

  metadata: {
    label: 'Min',
    description: 'Minimum value',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        min: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMin',
      params: {
        values: inputs.values
        
      }
    });

    return {
      min: result
    };
  }
};
