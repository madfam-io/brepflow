
import { NodeDefinition } from '@brepflow/types';

interface Params {
  distance: number;
  minimum: boolean;
}
interface Inputs {
  entity1: Shape;
  entity2: Shape;
}
interface Outputs {
  constrained: Shape[];
  constraint: Constraint;
}

export const DistanceNode: NodeDefinition<DistanceInputs, DistanceOutputs, DistanceParams> = {
  type: 'Assembly::Distance',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Distance',
    description: 'Set distance between entities',
    
    
  },

  params: {
        distance: {
      "default": 10,
      "min": 0,
      "max": 10000
    },
    minimum: {
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
      type: 'constraintDistance',
      params: {
        entity1: inputs.entity1,
        entity2: inputs.entity2,
        distance: params.distance,
        minimum: params.minimum
      }
    });

    return {
      constrained: result,
      constraint: result
    };
  }
};
