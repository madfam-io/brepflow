
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  points: number[];
  t: number;
}
interface Outputs {
  result: number;
}

export const BezierInterpNode: NodeDefinition<BezierInterpInputs, BezierInterpOutputs, BezierInterpParams> = {
  type: 'Math::BezierInterp',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'BezierInterp',
    description: 'Bezier interpolation',
    
    
  },

  params: {
    
  },

  inputs: {
        points: 'number[]',
    t: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathBezierInterp',
      params: {
        points: inputs.points,
        t: inputs.t
        
      }
    });

    return {
      result: result
    };
  }
};
