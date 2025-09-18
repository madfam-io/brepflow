
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
}
interface Inputs {
  entity1: Shape;
  entity2: Shape;
}
interface Outputs {
  constrained: Shape[];
  constraint: Constraint;
}

export const CoincidentNode: NodeDefinition<CoincidentInputs, CoincidentOutputs, CoincidentParams> = {
  type: 'Assembly::Coincident',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Coincident',
    description: 'Make two entities coincident',
    
    
  },

  params: {
        tolerance: {
      "default": 0.001,
      "min": 0,
      "max": 1
    }
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
      type: 'constraintCoincident',
      params: {
        entity1: inputs.entity1,
        entity2: inputs.entity2,
        tolerance: params.tolerance
      }
    });

    return {
      constrained: result,
      constraint: result
    };
  }
};
