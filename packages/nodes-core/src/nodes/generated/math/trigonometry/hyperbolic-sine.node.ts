
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const HyperbolicSineNode: NodeDefinition<HyperbolicSineInputs, HyperbolicSineOutputs, HyperbolicSineParams> = {
  type: 'Math::HyperbolicSine',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'HyperbolicSine',
    description: 'Hyperbolic sine',
    
    
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
      type: 'mathSinh',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
