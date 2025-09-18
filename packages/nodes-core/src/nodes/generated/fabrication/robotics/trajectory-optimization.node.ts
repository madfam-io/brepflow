
import { NodeDefinition } from '@brepflow/types';

interface Params {
  objective: string;
  maxVelocity: number;
  maxAcceleration: number;
}
interface Inputs {
  trajectory: Transform[];
}
interface Outputs {
  optimizedTrajectory: Transform[];
  velocityProfile: Data;
}

export const TrajectoryOptimizationNode: NodeDefinition<TrajectoryOptimizationInputs, TrajectoryOptimizationOutputs, TrajectoryOptimizationParams> = {
  type: 'Fabrication::TrajectoryOptimization',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'TrajectoryOptimization',
    description: 'Optimize robot trajectory',
    
    
  },

  params: {
        objective: {
      "default": "time",
      "options": [
        "time",
        "energy",
        "smooth",
        "accuracy"
      ]
    },
    maxVelocity: {
      "default": 1000,
      "min": 10,
      "max": 5000
    },
    maxAcceleration: {
      "default": 5000,
      "min": 100,
      "max": 20000
    }
  },

  inputs: {
        trajectory: 'Transform[]'
  },

  outputs: {
        optimizedTrajectory: 'Transform[]',
    velocityProfile: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'trajectoryOptimization',
      params: {
        trajectory: inputs.trajectory,
        objective: params.objective,
        maxVelocity: params.maxVelocity,
        maxAcceleration: params.maxAcceleration
      }
    });

    return {
      optimizedTrajectory: result,
      velocityProfile: result
    };
  }
};
