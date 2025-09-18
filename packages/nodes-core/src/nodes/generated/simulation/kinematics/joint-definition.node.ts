
import { NodeDefinition } from '@brepflow/types';

interface Params {
  jointType: string;
  axis: [number, number, number];
  minLimit: number;
  maxLimit: number;
}
interface Inputs {
  body1: Shape;
  body2: Shape;
  jointLocation: Point;
}
interface Outputs {
  joint: Data;
  assembly: Shape;
}

export const JointDefinitionNode: NodeDefinition<JointDefinitionInputs, JointDefinitionOutputs, JointDefinitionParams> = {
  type: 'Simulation::JointDefinition',
  category: 'Simulation',
  subcategory: 'Kinematics',

  metadata: {
    label: 'JointDefinition',
    description: 'Define kinematic joint',
    
    
  },

  params: {
        jointType: {
      "default": "revolute",
      "options": [
        "revolute",
        "prismatic",
        "cylindrical",
        "spherical",
        "planar",
        "fixed"
      ]
    },
    axis: {
      "default": [
        0,
        0,
        1
      ]
    },
    minLimit: {
      "default": -180,
      "min": -360,
      "max": 360
    },
    maxLimit: {
      "default": 180,
      "min": -360,
      "max": 360
    }
  },

  inputs: {
        body1: 'Shape',
    body2: 'Shape',
    jointLocation: 'Point'
  },

  outputs: {
        joint: 'Data',
    assembly: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointDefinition',
      params: {
        body1: inputs.body1,
        body2: inputs.body2,
        jointLocation: inputs.jointLocation,
        jointType: params.jointType,
        axis: params.axis,
        minLimit: params.minLimit,
        maxLimit: params.maxLimit
      }
    });

    return {
      joint: result,
      assembly: result
    };
  }
};
