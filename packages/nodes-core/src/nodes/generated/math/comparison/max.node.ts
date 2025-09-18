
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  max: number;
}

export const MaxNode: NodeDefinition<MaxInputs, MaxOutputs, MaxParams> = {
  type: 'Math::Max',
  category: 'Math',
  subcategory: 'Comparison',

  metadata: {
    label: 'Max',
    description: 'Maximum value',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        max: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMax',
      params: {
        values: inputs.values
        
      }
    });

    return {
      max: result
    };
  }
};
