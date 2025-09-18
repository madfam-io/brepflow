
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  min: number;
  max: number;
  range: number;
}

export const RangeNode: NodeDefinition<RangeInputs, RangeOutputs, RangeParams> = {
  type: 'Math::Range',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Range',
    description: 'Range of values',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        min: 'number',
    max: 'number',
    range: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathRange',
      params: {
        values: inputs.values
        
      }
    });

    return {
      min: result,
      max: result,
      range: result
    };
  }
};
