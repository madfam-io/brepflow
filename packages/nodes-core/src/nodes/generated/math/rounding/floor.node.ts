
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
}
interface Outputs {
  result: number;
}

export const FloorNode: NodeDefinition<FloorInputs, FloorOutputs, FloorParams> = {
  type: 'Math::Floor',
  category: 'Math',
  subcategory: 'Rounding',

  metadata: {
    label: 'Floor',
    description: 'Round down',
    
    
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
      type: 'mathFloor',
      params: {
        value: inputs.value
        
      }
    });

    return {
      result: result
    };
  }
};
