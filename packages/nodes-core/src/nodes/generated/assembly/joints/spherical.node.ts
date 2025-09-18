
import { NodeDefinition } from '@brepflow/types';

interface Params {
  coneAngle: number;
}
interface Inputs {
  part1: Shape;
  part2: Shape;
  center: Point;
}
interface Outputs {
  joint: Joint;
}

export const SphericalNode: NodeDefinition<SphericalInputs, SphericalOutputs, SphericalParams> = {
  type: 'Assembly::Spherical',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Spherical',
    description: 'Create spherical (ball) joint',
    
    
  },

  params: {
        coneAngle: {
      "default": 45,
      "min": 0,
      "max": 180
    }
  },

  inputs: {
        part1: 'Shape',
    part2: 'Shape',
    center: 'Point'
  },

  outputs: {
        joint: 'Joint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointSpherical',
      params: {
        part1: inputs.part1,
        part2: inputs.part2,
        center: inputs.center,
        coneAngle: params.coneAngle
      }
    });

    return {
      joint: result
    };
  }
};
