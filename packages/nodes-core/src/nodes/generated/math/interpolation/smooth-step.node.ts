
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  edge0: number;
  edge1: number;
  x: number;
}
interface Outputs {
  result: number;
}

export const SmoothStepNode: NodeDefinition<SmoothStepInputs, SmoothStepOutputs, SmoothStepParams> = {
  type: 'Math::SmoothStep',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'SmoothStep',
    description: 'Smooth step interpolation',
    
    
  },

  params: {
    
  },

  inputs: {
        edge0: 'number',
    edge1: 'number',
    x: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathSmoothStep',
      params: {
        edge0: inputs.edge0,
        edge1: inputs.edge1,
        x: inputs.x
        
      }
    });

    return {
      result: result
    };
  }
};
