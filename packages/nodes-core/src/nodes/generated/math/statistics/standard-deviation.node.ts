
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sample: boolean;
}
interface Inputs {
  values: number[];
}
interface Outputs {
  stddev: number;
}

export const StandardDeviationNode: NodeDefinition<StandardDeviationInputs, StandardDeviationOutputs, StandardDeviationParams> = {
  type: 'Math::StandardDeviation',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'StandardDeviation',
    description: 'Calculate standard deviation',
    
    
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
        stddev: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathStdDev',
      params: {
        values: inputs.values,
        sample: params.sample
      }
    });

    return {
      stddev: result
    };
  }
};
