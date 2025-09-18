
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  direction: string;
  tolerance: number;
}
interface Inputs {
  solid: Shape;
  facesToRemove: Face[];
}
interface Outputs {
  shell: Shape;
}

export const ShellNode: NodeDefinition<ShellInputs, ShellOutputs, ShellParams> = {
  type: 'Advanced::Shell',
  category: 'Advanced',
  subcategory: 'Shell',

  metadata: {
    label: 'Shell',
    description: 'Hollow out solid',
    
    
  },

  params: {
        thickness: {
      "default": 2,
      "min": 0.01,
      "max": 1000,
      "description": "Wall thickness"
    },
    direction: {
      "default": "inward",
      "options": [
        "inward",
        "outward",
        "both"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    }
  },

  inputs: {
        solid: 'Shape',
    facesToRemove: 'Face[]'
  },

  outputs: {
        shell: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'shell',
      params: {
        solid: inputs.solid,
        facesToRemove: inputs.facesToRemove,
        thickness: params.thickness,
        direction: params.direction,
        tolerance: params.tolerance
      }
    });

    return {
      shell: result
    };
  }
};
