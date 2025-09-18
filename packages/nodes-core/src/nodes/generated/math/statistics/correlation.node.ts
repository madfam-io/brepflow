
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  x: number[];
  y: number[];
}
interface Outputs {
  correlation: number;
}

export const CorrelationNode: NodeDefinition<CorrelationInputs, CorrelationOutputs, CorrelationParams> = {
  type: 'Math::Correlation',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Correlation',
    description: 'Correlation coefficient',
    
    
  },

  params: {
    
  },

  inputs: {
        x: 'number[]',
    y: 'number[]'
  },

  outputs: {
        correlation: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathCorrelation',
      params: {
        x: inputs.x,
        y: inputs.y
        
      }
    });

    return {
      correlation: result
    };
  }
};
