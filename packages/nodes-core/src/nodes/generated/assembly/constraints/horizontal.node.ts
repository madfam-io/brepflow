
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  entity: Shape;
}
interface Outputs {
  constrained: Shape;
  constraint: Constraint;
}

export const HorizontalNode: NodeDefinition<HorizontalInputs, HorizontalOutputs, HorizontalParams> = {
  type: 'Assembly::Horizontal',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Horizontal',
    description: 'Make entity horizontal',
    
    
  },

  params: {
    
  },

  inputs: {
        entity: 'Shape'
  },

  outputs: {
        constrained: 'Shape',
    constraint: 'Constraint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'constraintHorizontal',
      params: {
        entity: inputs.entity
        
      }
    });

    return {
      constrained: result,
      constraint: result
    };
  }
};
