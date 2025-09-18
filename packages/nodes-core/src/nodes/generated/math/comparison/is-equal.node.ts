
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
}
interface Inputs {
  a: number;
  b: number;
}
interface Outputs {
  equal: boolean;
}

export const IsEqualNode: NodeDefinition<IsEqualInputs, IsEqualOutputs, IsEqualParams> = {
  type: 'Math::IsEqual',
  category: 'Math',
  subcategory: 'Comparison',

  metadata: {
    label: 'IsEqual',
    description: 'Check equality with tolerance',
    
    
  },

  params: {
        tolerance: {
      "default": 0.0001,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        a: 'number',
    b: 'number'
  },

  outputs: {
        equal: 'boolean'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathIsEqual',
      params: {
        a: inputs.a,
        b: inputs.b,
        tolerance: params.tolerance
      }
    });

    return {
      equal: result
    };
  }
};
