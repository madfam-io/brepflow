
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const CeilingNode: NodeDefinition<CeilingInputs, CeilingOutputs, CeilingParams> = {
  type: 'Math::Ceiling',
  category: 'Math',
  subcategory: 'Rounding',

  metadata: {
    label: 'Ceiling',
    description: 'Round up',
    
    
  },

  params: {
    
  },

  inputs: {
        value: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathCeil',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
