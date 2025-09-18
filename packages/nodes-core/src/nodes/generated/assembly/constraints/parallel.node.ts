
import { NodeDefinition } from '@brepflow/types';

interface Params {
  offset: number;
  flip: boolean;
}
interface Inputs {
  entity1: Shape;
  entity2: Shape;
}
interface Outputs {
  constrained: Shape[];
  constraint: Constraint;
}

export const ParallelNode: NodeDefinition<ParallelInputs, ParallelOutputs, ParallelParams> = {
  type: 'Assembly::Parallel',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Parallel',
    description: 'Make two entities parallel',
    
    
  },

  params: {
        offset: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    flip: {
      "default": false
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
      type: 'constraintParallel',
      params: {
        entity1: inputs.entity1,
        entity2: inputs.entity2,
        offset: params.offset,
        flip: params.flip
      }
    });

    return {
      constrained: result,
      constraint: result
    };
  }
};
