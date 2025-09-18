
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: number;
  b: number;
}
interface Outputs {
  result: number;
}

export const ModuloNode: NodeDefinition<ModuloInputs, ModuloOutputs, ModuloParams> = {
  type: 'Math::Modulo',
  category: 'Math',
  subcategory: 'Operators',

  metadata: {
    label: 'Modulo',
    description: 'Modulo operation',
    
    
  },

  params: {
    
  },

  inputs: {
        a: 'number',
    b: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathModulo',
      params: {
        a: inputs.a,
        b: inputs.b
        
      }
    });

    return {
      result: result
    };
  }
};
