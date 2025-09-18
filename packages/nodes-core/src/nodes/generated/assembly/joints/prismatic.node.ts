
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minDistance: number;
  maxDistance: number;
}
interface Inputs {
  part1: Shape;
  part2: Shape;
  direction: Vector;
}
interface Outputs {
  joint: Joint;
}

export const PrismaticNode: NodeDefinition<PrismaticInputs, PrismaticOutputs, PrismaticParams> = {
  type: 'Assembly::Prismatic',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Prismatic',
    description: 'Create prismatic (sliding) joint',
    
    
  },

  params: {
        minDistance: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    maxDistance: {
      "default": 100,
      "min": -10000,
      "max": 10000
    }
  },

  inputs: {
        part1: 'Shape',
    part2: 'Shape',
    direction: 'Vector'
  },

  outputs: {
        joint: 'Joint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointPrismatic',
      params: {
        part1: inputs.part1,
        part2: inputs.part2,
        direction: inputs.direction,
        minDistance: params.minDistance,
        maxDistance: params.maxDistance
      }
    });

    return {
      joint: result
    };
  }
};
