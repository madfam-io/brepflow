
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minDistance: number;
  maxDistance: number;
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

export const CylindricalNode: NodeDefinition<CylindricalInputs, CylindricalOutputs, CylindricalParams> = {
  type: 'Assembly::Cylindrical',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Cylindrical',
    description: 'Create cylindrical joint',
    
    
  },

  params: {
        minDistance: {
      "default": 0
    },
    maxDistance: {
      "default": 100
    },
    minAngle: {
      "default": -180
    },
    maxAngle: {
      "default": 180
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
      type: 'jointCylindrical',
      params: {
        part1: inputs.part1,
        part2: inputs.part2,
        axis: inputs.axis,
        minDistance: params.minDistance,
        maxDistance: params.maxDistance,
        minAngle: params.minAngle,
        maxAngle: params.maxAngle
      }
    });

    return {
      joint: result
    };
  }
};
