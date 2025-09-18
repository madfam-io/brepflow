
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const HyperbolicTangentNode: NodeDefinition<HyperbolicTangentInputs, HyperbolicTangentOutputs, HyperbolicTangentParams> = {
  type: 'Math::HyperbolicTangent',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'HyperbolicTangent',
    description: 'Hyperbolic tangent',
    
    
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
      type: 'mathTanh',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
