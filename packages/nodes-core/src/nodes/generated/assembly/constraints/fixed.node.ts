
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  entity: Shape;
}
interface Outputs {
  constrained: Shape;
  constraint: Constraint;
}

export const FixedNode: NodeDefinition<FixedInputs, FixedOutputs, FixedParams> = {
  type: 'Assembly::Fixed',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Fixed',
    description: 'Fix entity in space',
    
    
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
      type: 'constraintFixed',
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
