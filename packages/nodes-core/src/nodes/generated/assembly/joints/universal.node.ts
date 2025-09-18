
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  part1: Shape;
  part2: Shape;
  center: Point;
}
interface Outputs {
  joint: Joint;
}

export const UniversalNode: NodeDefinition<UniversalInputs, UniversalOutputs, UniversalParams> = {
  type: 'Assembly::Universal',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Universal',
    description: 'Create universal joint',
    
    
  },

  params: {
    
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
      type: 'jointUniversal',
      params: {
        part1: inputs.part1,
        part2: inputs.part2,
        center: inputs.center
        
      }
    });

    return {
      joint: result
    };
  }
};
