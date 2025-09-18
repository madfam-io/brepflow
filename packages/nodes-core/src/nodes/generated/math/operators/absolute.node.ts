
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const AbsoluteNode: NodeDefinition<AbsoluteInputs, AbsoluteOutputs, AbsoluteParams> = {
  type: 'Math::Absolute',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Absolute',
    description: 'Absolute value',
    
    
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
      type: 'mathAbs',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
