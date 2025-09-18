
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sample: boolean;
}
interface Inputs {
  values: number[];
}
interface Outputs {
  variance: number;
}

export const VarianceNode: NodeDefinition<VarianceInputs, VarianceOutputs, VarianceParams> = {
  type: 'Math::Variance',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Variance',
    description: 'Calculate variance',
    
    
  },

  params: {
        sample: {
      "default": false
    }
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        variance: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathVariance',
      params: {
        values: inputs.values,
        sample: params.sample
      }
    });

    return {
      variance: result
    };
  }
};
