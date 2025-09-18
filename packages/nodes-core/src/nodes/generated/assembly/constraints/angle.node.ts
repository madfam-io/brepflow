
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
}
interface Inputs {
  entity1: Shape;
  entity2: Shape;
}
interface Outputs {
  constrained: Shape[];
  constraint: Constraint;
}

export const AngleNode: NodeDefinition<AngleInputs, AngleOutputs, AngleParams> = {
  type: 'Assembly::Angle',
  category: 'Assembly',
  subcategory: 'Constraints',

  metadata: {
    label: 'Angle',
    description: 'Set angle between entities',
    
    
  },

  params: {
        angle: {
      "default": 90,
      "min": 0,
      "max": 360
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
      type: 'constraintAngle',
      params: {
        entity1: inputs.entity1,
        entity2: inputs.entity2,
        angle: params.angle
      }
    });

    return {
      constrained: result,
      constraint: result
    };
  }
};
