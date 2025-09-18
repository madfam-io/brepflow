
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
  factor: number;
}
interface Inputs {
  field: ScalarField;
}
interface Outputs {
  smoothed: ScalarField;
}

export const FieldSmoothNode: NodeDefinition<FieldSmoothInputs, FieldSmoothOutputs, FieldSmoothParams> = {
  type: 'Field::FieldSmooth',
  category: 'Field',
  subcategory: 'Operations',

  metadata: {
    label: 'FieldSmooth',
    description: 'Smooth field',
    
    
  },

  params: {
        iterations: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    factor: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        field: 'ScalarField'
  },

  outputs: {
        smoothed: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldSmooth',
      params: {
        field: inputs.field,
        iterations: params.iterations,
        factor: params.factor
      }
    });

    return {
      smoothed: result
    };
  }
};
