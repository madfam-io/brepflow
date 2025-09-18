
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const NaturalLogNode: NodeDefinition<NaturalLogInputs, NaturalLogOutputs, NaturalLogParams> = {
  type: 'Math::NaturalLog',
  category: 'Math',
  subcategory: 'Logarithmic',

  metadata: {
    label: 'NaturalLog',
    description: 'Natural logarithm',
    
    
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
      type: 'mathLn',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
