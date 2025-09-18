
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  median: number;
}

export const MedianNode: NodeDefinition<MedianInputs, MedianOutputs, MedianParams> = {
  type: 'Math::Median',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Median',
    description: 'Calculate median',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        median: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMedian',
      params: {
        values: inputs.values
        
      }
    });

    return {
      median: result
    };
  }
};
