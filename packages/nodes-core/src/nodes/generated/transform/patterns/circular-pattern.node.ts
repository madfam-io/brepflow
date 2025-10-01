
import { NodeDefinition } from '@brepflow/types';

interface Params {
  count: number;
  angle: number;
  center: [number, number, number];
  axis: [number, number, number];
  rotateInstances: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  shapes: Shape[];
  compound: Shape;
}

export const CircularPatternNode: NodeDefinition<CircularPatternInputs, CircularPatternOutputs, CircularPatternParams> = {
  type: 'Transform::CircularPattern',
  category: 'Transform',
  subcategory: 'Patterns',

  metadata: {
    label: 'CircularPattern',
    description: 'Creates a circular array of features or shapes',
    
    tags: ["pattern","array","duplicate","circular","polar"],
  },

  params: {
        count: {
      "default": 6,
      "min": 2,
      "max": 1000,
      "step": 1
    },
    angle: {
      "default": 360,
      "min": 0,
      "max": 360,
      "description": "Total angle to fill (degrees)"
    },
    center: {
      "default": [
        0,
        0,
        0
      ],
      "description": "Pattern center point"
    },
    axis: {
      "default": [
        0,
        0,
        1
      ],
      "description": "Rotation axis"
    },
    rotateInstances: {
      "default": true,
      "description": "Rotate instances to follow pattern"
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
    const center = params.center || [0, 0, 0];
    const axis = params.axis || [0, 0, 1];

    const response = await context.geometry.execute({
      type: 'CREATE_CIRCULAR_PATTERN',
      params: {
        shape: inputs.shape,
        count: params.count,
        angle: params.angle,
        center: {
          x: center[0],
          y: center[1],
          z: center[2]
        },
        axis: {
          x: axis[0],
          y: axis[1],
          z: axis[2]
        },
        rotateInstances: params.rotateInstances,
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
