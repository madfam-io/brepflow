
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  part1: Shape;
  part2: Shape;
}
interface Outputs {
  joint: Joint;
}

export const FixedNode: NodeDefinition<FixedInputs, FixedOutputs, FixedParams> = {
  type: 'Assembly::Fixed',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Fixed',
    description: 'Create fixed joint',
    
    
  },

  params: {
    
  },

  inputs: {
        part1: 'Shape',
    part2: 'Shape'
  },

  outputs: {
        joint: 'Joint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointFixed',
      params: {
        part1: inputs.part1,
        part2: inputs.part2
        
      }
    });

    return {
      joint: result
    };
  }
};
