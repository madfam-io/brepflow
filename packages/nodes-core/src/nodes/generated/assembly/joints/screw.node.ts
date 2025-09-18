
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pitch: number;
}
interface Inputs {
  part1: Shape;
  part2: Shape;
  axis: Axis;
}
interface Outputs {
  joint: Joint;
}

export const ScrewNode: NodeDefinition<ScrewInputs, ScrewOutputs, ScrewParams> = {
  type: 'Assembly::Screw',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Screw',
    description: 'Create screw joint',
    
    
  },

  params: {
        pitch: {
      "default": 1,
      "min": 0.01,
      "max": 100
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
      type: 'jointScrew',
      params: {
        part1: inputs.part1,
        part2: inputs.part2,
        axis: inputs.axis,
        pitch: params.pitch
      }
    });

    return {
      joint: result
    };
  }
};
