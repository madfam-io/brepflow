
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  entity1: Shape;
  entity2: Shape;
}
interface Outputs {
  constrained: Shape[];
  constraint: Constraint;
}

export const ConcentricNode: NodeDefinition<ConcentricInputs, ConcentricOutputs, ConcentricParams> = {
  type: 'Assembly::Concentric',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Concentric',
    description: 'Make two circular entities concentric',
    
    
  },

  params: {
    
  },

  inputs: {
        entity1: 'Shape',
    entity2: 'Shape'
  },

  outputs: {
        constrained: 'Shape[]',
    constraint: 'Constraint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'constraintConcentric',
      params: {
        entity1: inputs.entity1,
        entity2: inputs.entity2
        
      }
    });

    return {
      constrained: result,
      constraint: result
    };
  }
};
