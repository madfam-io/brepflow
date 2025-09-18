
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const Exp10Node: NodeDefinition<Exp10Inputs, Exp10Outputs, Exp10Params> = {
  type: 'Math::Exp10',
  category: 'Math',
  subcategory: 'Logarithmic',

  metadata: {
    label: 'Exp10',
    description: '10 raised to power',
    
    
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
      type: 'mathExp10',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
