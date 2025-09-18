
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
    
    // TODO: Implement CircularPattern logic
    throw new Error('CircularPattern not yet implemented');
  }
};
