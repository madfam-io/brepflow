
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  value: number;
  min: number;
  max: number;
}
interface Outputs {
  result: number;
}

export const ClampNode: NodeDefinition<ClampInputs, ClampOutputs, ClampParams> = {
  type: 'Math::Clamp',
  category: 'Math',
  subcategory: 'Comparison',

  metadata: {
    label: 'Clamp',
    description: 'Clamp value between min and max',
    
    
  },

  params: {
    
  },

  inputs: {
        value: 'number',
    min: 'number',
    max: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathClamp',
      params: {
        value: inputs.value,
        min: inputs.min,
        max: inputs.max
        
      }
    });

    return {
      result: result
    };
  }
};
