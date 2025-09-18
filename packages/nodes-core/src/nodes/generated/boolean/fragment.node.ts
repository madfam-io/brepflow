
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  shapes: Shape[];
}
interface Outputs {
  fragments: Shape[];
}

export const FragmentNode: NodeDefinition<FragmentInputs, FragmentOutputs, FragmentParams> = {
  type: 'Boolean::Fragment',
  category: 'Boolean',
  

  metadata: {
    label: 'Fragment',
    description: 'Fragment all shapes by each other',
    
    
  },

  params: {
    
  },

  inputs: {
        shapes: 'Shape[]'
  },

  outputs: {
        fragments: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'booleanFragment',
      params: {
        shapes: inputs.shapes
        
      }
    });

    return {
      fragments: result
    };
  }
};
