
import { NodeDefinition } from '@brepflow/types';

interface Params {
  deformType: string;
  radius: number;
  stiffness: number;
}
interface Inputs {
  shape: Shape;
  controlPoints: Point[];
  targetPoints: Point[];
}
interface Outputs {
  deformed: Shape;
}

export const DeformNode: NodeDefinition<DeformInputs, DeformOutputs, DeformParams> = {
  type: 'Advanced::Deform',
  category: 'Advanced',
  subcategory: 'Features',

  metadata: {
    label: 'Deform',
    description: 'Point deformation',
    
    
  },

  params: {
        deformType: {
      "default": "point",
      "options": [
        "point",
        "curve",
        "surface"
      ]
    },
    radius: {
      "default": 50,
      "min": 0.1,
      "max": 1000
    },
    stiffness: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        shape: 'Shape',
    controlPoints: 'Point[]',
    targetPoints: 'Point[]'
  },

  outputs: {
        deformed: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'deform',
      params: {
        shape: inputs.shape,
        controlPoints: inputs.controlPoints,
        targetPoints: inputs.targetPoints,
        deformType: params.deformType,
        radius: params.radius,
        stiffness: params.stiffness
      }
    });

    return {
      deformed: result
    };
  }
};
