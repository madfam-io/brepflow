
import { NodeDefinition } from '@brepflow/types';

interface Params {
  syncMethod: string;
}
interface Inputs {
  robotPaths: Transform[][];
}
interface Outputs {
  synchronizedPaths: Transform[][];
}

export const MultiRobotCoordinationNode: NodeDefinition<MultiRobotCoordinationInputs, MultiRobotCoordinationOutputs, MultiRobotCoordinationParams> = {
  type: 'Fabrication::MultiRobotCoordination',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'MultiRobotCoordination',
    description: 'Coordinate multiple robots',
    
    
  },

  params: {
        syncMethod: {
      "default": "position",
      "options": [
        "time",
        "position",
        "event"
      ]
    }
  },

  inputs: {
        robotPaths: 'Transform[][]'
  },

  outputs: {
        synchronizedPaths: 'Transform[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'multiRobotCoordination',
      params: {
        robotPaths: inputs.robotPaths,
        syncMethod: params.syncMethod
      }
    });

    return {
      synchronizedPaths: result
    };
  }
};
