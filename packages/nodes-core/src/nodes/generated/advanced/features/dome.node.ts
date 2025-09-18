
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  constraintType: string;
}
interface Inputs {
  face: Face;
}
interface Outputs {
  dome: Shape;
}

export const DomeNode: NodeDefinition<DomeInputs, DomeOutputs, DomeParams> = {
  type: 'Advanced::Dome',
  category: 'Advanced',
  subcategory: 'Features',

  metadata: {
    label: 'Dome',
    description: 'Create dome on face',
    
    
  },

  params: {
        height: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    constraintType: {
      "default": "tangent",
      "options": [
        "none",
        "tangent",
        "elliptical"
      ]
    }
  },

  inputs: {
        face: 'Face'
  },

  outputs: {
        dome: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'dome',
      params: {
        face: inputs.face,
        height: params.height,
        constraintType: params.constraintType
      }
    });

    return {
      dome: result
    };
  }
};
