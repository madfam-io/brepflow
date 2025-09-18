
import { NodeDefinition } from '@brepflow/types';

interface Params {
  robotType: string;
  solver: string;
}
interface Inputs {
  target: Transform;
  jointLimits?: Data;
}
interface Outputs {
  jointAngles: Number[];
  reachable: Boolean;
}

export const RobotKinematicsNode: NodeDefinition<RobotKinematicsInputs, RobotKinematicsOutputs, RobotKinematicsParams> = {
  type: 'Fabrication::RobotKinematics',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'RobotKinematics',
    description: 'Robot kinematics solver',
    
    
  },

  params: {
        robotType: {
      "default": "6-axis",
      "options": [
        "6-axis",
        "scara",
        "delta",
        "cartesian"
      ]
    },
    solver: {
      "default": "inverse",
      "options": [
        "forward",
        "inverse"
      ]
    }
  },

  inputs: {
        target: 'Transform',
    jointLimits: 'Data'
  },

  outputs: {
        jointAngles: 'Number[]',
    reachable: 'Boolean'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'robotKinematics',
      params: {
        target: inputs.target,
        jointLimits: inputs.jointLimits,
        robotType: params.robotType,
        solver: params.solver
      }
    });

    return {
      jointAngles: result,
      reachable: result
    };
  }
};
