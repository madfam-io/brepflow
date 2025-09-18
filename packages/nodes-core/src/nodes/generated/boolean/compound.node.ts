
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  shapes: Shape[];
}
interface Outputs {
  compound: Compound;
}

export const CompoundNode: NodeDefinition<CompoundInputs, CompoundOutputs, CompoundParams> = {
  type: 'Boolean::Compound',
  category: 'Boolean',
  

  metadata: {
    label: 'Compound',
    description: 'Create a compound from multiple shapes',
    
    
  },

  params: {
    
  },

  inputs: {
        shapes: 'Shape[]'
  },

  outputs: {
        compound: 'Compound'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeCompound',
      params: {
        shapes: inputs.shapes
        
      }
    });

    return {
      compound: result
    };
  }
};
