
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  p0: number;
  p1: number;
  m0: number;
  m1: number;
  t: number;
}
interface Outputs {
  result: number;
}

export const HermiteInterpNode: NodeDefinition<HermiteInterpInputs, HermiteInterpOutputs, HermiteInterpParams> = {
  type: 'Math::HermiteInterp',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'HermiteInterp',
    description: 'Hermite interpolation',
    
    
  },

  params: {
    
  },

  inputs: {
        p0: 'number',
    p1: 'number',
    m0: 'number',
    m1: 'number',
    t: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathHermiteInterp',
      params: {
        p0: inputs.p0,
        p1: inputs.p1,
        m0: inputs.m0,
        m1: inputs.m1,
        t: inputs.t
        
      }
    });

    return {
      result: result
    };
  }
};
