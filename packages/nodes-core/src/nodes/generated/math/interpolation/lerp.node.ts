
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: number;
  b: number;
  t: number;
}
interface Outputs {
  result: number;
}

export const LerpNode: NodeDefinition<LerpInputs, LerpOutputs, LerpParams> = {
  type: 'Math::Lerp',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'Lerp',
    description: 'Linear interpolation',
    
    
  },

  params: {
    
  },

  inputs: {
        a: 'number',
    b: 'number',
    t: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathLerp',
      params: {
        a: inputs.a,
        b: inputs.b,
        t: inputs.t
        
      }
    });

    return {
      result: result
    };
  }
};
