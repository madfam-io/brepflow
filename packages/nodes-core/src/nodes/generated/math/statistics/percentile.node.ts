
import { NodeDefinition } from '@brepflow/types';

interface Params {
  percentile: number;
}
interface Inputs {
  values: number[];
}
interface Outputs {
  result: number;
}

export const PercentileNode: NodeDefinition<PercentileInputs, PercentileOutputs, PercentileParams> = {
  type: 'Math::Percentile',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Percentile',
    description: 'Calculate percentile',
    
    
  },

  params: {
        percentile: {
      "default": 50,
      "min": 0,
      "max": 100
    }
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathPercentile',
      params: {
        values: inputs.values,
        percentile: params.percentile
      }
    });

    return {
      result: result
    };
  }
};
