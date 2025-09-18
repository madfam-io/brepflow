
import { NodeDefinition } from '@brepflow/types';

interface Params {
  inside: boolean;
}
interface Inputs {
  entity1: Shape;
  entity2: Shape;
}
interface Outputs {
  constrained: Shape[];
  constraint: Constraint;
}

export const TangentNode: NodeDefinition<TangentInputs, TangentOutputs, TangentParams> = {
  type: 'Assembly::Tangent',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Tangent',
    description: 'Make two entities tangent',
    
    
  },

  params: {
        inside: {
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
      type: 'constraintTangent',
      params: {
        entity1: inputs.entity1,
        entity2: inputs.entity2,
        inside: params.inside
      }
    });

    return {
      constrained: result,
      constraint: result
    };
  }
};
