
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  values: number[];
}
interface Outputs {
  mode: number[];
}

export const ModeNode: NodeDefinition<ModeInputs, ModeOutputs, ModeParams> = {
  type: 'Math::Mode',
  category: 'Math',
  subcategory: 'Statistics',

  metadata: {
    label: 'Mode',
    description: 'Calculate mode',
    
    
  },

  params: {
    
  },

  inputs: {
        values: 'number[]'
  },

  outputs: {
        mode: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathMode',
      params: {
        values: inputs.values
        
      }
    });

    return {
      mode: result
    };
  }
};
