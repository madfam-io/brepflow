
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const HyperbolicCosineNode: NodeDefinition<HyperbolicCosineInputs, HyperbolicCosineOutputs, HyperbolicCosineParams> = {
  type: 'Math::HyperbolicCosine',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'HyperbolicCosine',
    description: 'Hyperbolic cosine',
    
    
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
      type: 'mathCosh',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
