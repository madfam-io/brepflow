
import { NodeDefinition } from '@brepflow/types';

interface Params {
  count: number;
  spacing: number;
  direction: [number, number, number];
  centered: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  shapes: Shape[];
  compound: Shape;
}

export const LinearPatternNode: NodeDefinition<LinearPatternInputs, LinearPatternOutputs, LinearPatternParams> = {
  type: 'Transform::LinearPattern',
  category: 'Transform',
  subcategory: 'Patterns',

  metadata: {
    label: 'LinearPattern',
    description: 'Creates a linear array of features or shapes',
    
    tags: ["pattern","array","duplicate","linear"],
  },

  params: {
        count: {
      "default": 5,
      "min": 2,
      "max": 1000,
      "step": 1,
      "description": "Number of instances"
    },
    spacing: {
      "default": 20,
      "min": 0.1,
      "max": 10000,
      "description": "Distance between instances"
    },
    direction: {
      "default": [
        1,
        0,
        0
      ],
      "description": "Pattern direction vector"
    },
    centered: {
      "default": false,
      "description": "Center pattern around origin"
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        shapes: 'Shape[]',
    compound: 'Shape'
  },

  async evaluate(context, inputs, params) {
    const direction = params.direction || [1, 0, 0];

    const response = await context.geometry.execute({
      type: 'CREATE_LINEAR_PATTERN',
      params: {
        shape: inputs.shape,
        count: params.count,
        spacing: params.spacing,
        direction: {
          x: direction[0],
          y: direction[1],
          z: direction[2]
        },
        centered: params.centered,
        keepOriginal: true
      }
    });

    const shapes = Array.isArray(response) ? response : response?.shapes ?? [];
    const compound = Array.isArray(response) ? null : response?.compound ?? null;

    return {
      shapes,
      compound
    };
  }
};
