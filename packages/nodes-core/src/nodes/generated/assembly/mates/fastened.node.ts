
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  component1: Shape;
  component2: Shape;
}
interface Outputs {
  fastened: Shape[];
  mate: Mate;
}

export const FastenedNode: NodeDefinition<FastenedInputs, FastenedOutputs, FastenedParams> = {
  type: 'Assembly::Fastened',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'Fastened',
    description: 'Fasten components together rigidly',
    
    
  },

  params: {
    
  },

  inputs: {
        component1: 'Shape',
    component2: 'Shape'
  },

  outputs: {
        fastened: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mateFastened',
      params: {
        component1: inputs.component1,
        component2: inputs.component2
        
      }
    });

    return {
      fastened: result,
      mate: result
    };
  }
};
