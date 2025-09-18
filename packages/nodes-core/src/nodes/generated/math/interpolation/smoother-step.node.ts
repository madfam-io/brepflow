
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

export const SmootherStepNode: NodeDefinition<SmootherStepInputs, SmootherStepOutputs, SmootherStepParams> = {
  type: 'Math::SmootherStep',
  category: 'Math',
  subcategory: 'Interpolation',

  metadata: {
    label: 'SmootherStep',
    description: 'Smoother step interpolation',
    
    
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
      type: 'mathSmootherStep',
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
