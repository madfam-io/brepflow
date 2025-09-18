
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  smoothing: boolean;
}
interface Inputs {
  waypoints: Transform[];
  obstacles?: Shape[];
}
interface Outputs {
  trajectory: Transform[];
  jointTrajectory: Data;
}

export const PathPlanningNode: NodeDefinition<PathPlanningInputs, PathPlanningOutputs, PathPlanningParams> = {
  type: 'Fabrication::PathPlanning',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'PathPlanning',
    description: 'Robot path planning',
    
    
  },

  params: {
        algorithm: {
      "default": "rrt",
      "options": [
        "rrt",
        "prm",
        "a-star",
        "potential-field"
      ]
    },
    smoothing: {
      "default": true
    }
  },

  inputs: {
        waypoints: 'Transform[]',
    obstacles: 'Shape[]'
  },

  outputs: {
        trajectory: 'Transform[]',
    jointTrajectory: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'pathPlanning',
      params: {
        waypoints: inputs.waypoints,
        obstacles: inputs.obstacles,
        algorithm: params.algorithm,
        smoothing: params.smoothing
      }
    });

    return {
      trajectory: result,
      jointTrajectory: result
    };
  }
};
