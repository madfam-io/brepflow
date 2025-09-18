
import { NodeDefinition } from '@brepflow/types';

interface Params {
  threshold: number;
}
interface Inputs {
  jointTrajectory: Data;
}
interface Outputs {
  safeTrajectory: Data;
  singularityPoints: Number[];
}

export const SingularityAvoidanceNode: NodeDefinition<SingularityAvoidanceInputs, SingularityAvoidanceOutputs, SingularityAvoidanceParams> = {
  type: 'Fabrication::SingularityAvoidance',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'SingularityAvoidance',
    description: 'Avoid robot singularities',
    
    
  },

  params: {
        threshold: {
      "default": 0.1,
      "min": 0.01,
      "max": 1
    }
  },

  inputs: {
        jointTrajectory: 'Data'
  },

  outputs: {
        safeTrajectory: 'Data',
    singularityPoints: 'Number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'singularityAvoidance',
      params: {
        jointTrajectory: inputs.jointTrajectory,
        threshold: params.threshold
      }
    });

    return {
      safeTrajectory: result,
      singularityPoints: result
    };
  }
};
