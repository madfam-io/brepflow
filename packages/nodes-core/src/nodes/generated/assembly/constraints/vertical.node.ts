
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  entity: Shape;
}
interface Outputs {
  constrained: Shape;
  constraint: Constraint;
}

export const VerticalNode: NodeDefinition<VerticalInputs, VerticalOutputs, VerticalParams> = {
  type: 'Assembly::Vertical',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Vertical',
    description: 'Make entity vertical',
    
    
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
      type: 'constraintVertical',
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
