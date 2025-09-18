
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  v0: number;
  v1: number;
  v2: number;
  v3: number;
  t: number;
}
interface Outputs {
  result: number;
}

export const CubicInterpNode: NodeDefinition<CubicInterpInputs, CubicInterpOutputs, CubicInterpParams> = {
  type: 'Math::CubicInterp',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'CubicInterp',
    description: 'Cubic interpolation',
    
    
  },

  params: {
    
  },

  inputs: {
        v0: 'number',
    v1: 'number',
    v2: 'number',
    v3: 'number',
    t: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathCubicInterp',
      params: {
        v0: inputs.v0,
        v1: inputs.v1,
        v2: inputs.v2,
        v3: inputs.v3,
        t: inputs.t
        
      }
    });

    return {
      result: result
    };
  }
};
