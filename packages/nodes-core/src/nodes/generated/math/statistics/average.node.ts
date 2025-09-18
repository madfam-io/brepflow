
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  average: number;
}

export const AverageNode: NodeDefinition<AverageInputs, AverageOutputs, AverageParams> = {
  type: 'Math::Average',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Average',
    description: 'Calculate average',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        average: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathAverage',
      params: {
        values: inputs.values
        
      }
    });

    return {
      average: result
    };
  }
};
