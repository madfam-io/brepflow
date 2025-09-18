
import { NodeDefinition } from '@brepflow/types';

interface Params {
  margin: number;
}
interface Inputs {
  jointTrajectory: Data;
}
interface Outputs {
  safeTrajectory: Data;
}

export const JointLimitAvoidanceNode: NodeDefinition<JointLimitAvoidanceInputs, JointLimitAvoidanceOutputs, JointLimitAvoidanceParams> = {
  type: 'Fabrication::JointLimitAvoidance',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'JointLimitAvoidance',
    description: 'Avoid joint limits',
    
    
  },

  params: {
        margin: {
      "default": 5,
      "min": 0,
      "max": 30
    }
  },

  inputs: {
        jointTrajectory: 'Data'
  },

  outputs: {
        safeTrajectory: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointLimitAvoidance',
      params: {
        jointTrajectory: inputs.jointTrajectory,
        margin: params.margin
      }
    });

    return {
      safeTrajectory: result
    };
  }
};
