
import { NodeDefinition } from '@brepflow/types';

interface Params {
  motionType: string;
  velocity: number;
  acceleration: number;
  period: number;
}
interface Inputs {
  joint: Data;
  motionProfile?: Data;
}
interface Outputs {
  drivenJoint: Data;
}

export const MotionDriverNode: NodeDefinition<MotionDriverInputs, MotionDriverOutputs, MotionDriverParams> = {
  type: 'Simulation::MotionDriver',
  category: 'Simulation',
  subcategory: 'Kinematics',

  metadata: {
    label: 'MotionDriver',
    description: 'Define motion driver',
    
    
  },

  params: {
        motionType: {
      "default": "constant",
      "options": [
        "constant",
        "harmonic",
        "profile",
        "expression"
      ]
    },
    velocity: {
      "default": 1,
      "min": -1000,
      "max": 1000
    },
    acceleration: {
      "default": 0,
      "min": -1000,
      "max": 1000
    },
    period: {
      "default": 1,
      "min": 0.001,
      "max": 100
    }
  },

  inputs: {
        joint: 'Data',
    motionProfile: 'Data'
  },

  outputs: {
        drivenJoint: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'motionDriver',
      params: {
        joint: inputs.joint,
        motionProfile: inputs.motionProfile,
        motionType: params.motionType,
        velocity: params.velocity,
        acceleration: params.acceleration,
        period: params.period
      }
    });

    return {
      drivenJoint: result
    };
  }
};
