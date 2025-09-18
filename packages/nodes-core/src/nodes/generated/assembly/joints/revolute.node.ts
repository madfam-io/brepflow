
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minAngle: number;
  maxAngle: number;
}
interface Inputs {
  part1: Shape;
  part2: Shape;
  axis: Axis;
}
interface Outputs {
  joint: Joint;
}

export const RevoluteNode: NodeDefinition<RevoluteInputs, RevoluteOutputs, RevoluteParams> = {
  type: 'Assembly::Revolute',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Revolute',
    description: 'Create revolute (hinge) joint',
    
    
  },

  params: {
        minAngle: {
      "default": -180,
      "min": -360,
      "max": 360
    },
    maxAngle: {
      "default": 180,
      "min": -360,
      "max": 360
    }
  },

  inputs: {
        part1: 'Shape',
    part2: 'Shape',
    axis: 'Axis'
  },

  outputs: {
        joint: 'Joint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointRevolute',
      params: {
        part1: inputs.part1,
        part2: inputs.part2,
        axis: inputs.axis,
        minAngle: params.minAngle,
        maxAngle: params.maxAngle
      }
    });

    return {
      joint: result
    };
  }
};
