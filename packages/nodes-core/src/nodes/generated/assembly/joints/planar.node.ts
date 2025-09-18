
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  part1: Shape;
  part2: Shape;
  plane: Plane;
}
interface Outputs {
  joint: Joint;
}

export const PlanarNode: NodeDefinition<PlanarInputs, PlanarOutputs, PlanarParams> = {
  type: 'Assembly::Planar',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Planar',
    description: 'Create planar joint',
    
    
  },

  params: {
    
  },

  inputs: {
        part1: 'Shape',
    part2: 'Shape',
    plane: 'Plane'
  },

  outputs: {
        joint: 'Joint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointPlanar',
      params: {
        part1: inputs.part1,
        part2: inputs.part2,
        plane: inputs.plane
        
      }
    });

    return {
      joint: result
    };
  }
};
