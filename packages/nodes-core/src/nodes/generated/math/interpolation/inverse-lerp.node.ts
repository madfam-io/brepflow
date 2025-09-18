
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  a: number;
  b: number;
  value: number;
}
interface Outputs {
  t: number;
}

export const InverseLerpNode: NodeDefinition<InverseLerpInputs, InverseLerpOutputs, InverseLerpParams> = {
  type: 'Math::InverseLerp',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'InverseLerp',
    description: 'Inverse linear interpolation',
    
    
  },

  params: {
    
  },

  inputs: {
        a: 'number',
    b: 'number',
    value: 'number'
  },

  outputs: {
        t: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathInverseLerp',
      params: {
        a: inputs.a,
        b: inputs.b,
        value: inputs.value
        
      }
    });

    return {
      t: result
    };
  }
};
