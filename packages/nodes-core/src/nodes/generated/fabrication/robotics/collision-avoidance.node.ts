
import { NodeDefinition } from '@brepflow/types';

interface Params {
  safetyMargin: number;
}
interface Inputs {
  robotPath: Transform[];
  environment: Shape[];
}
interface Outputs {
  safePath: Transform[];
  collisionPoints: Point[];
}

export const CollisionAvoidanceNode: NodeDefinition<CollisionAvoidanceInputs, CollisionAvoidanceOutputs, CollisionAvoidanceParams> = {
  type: 'Fabrication::CollisionAvoidance',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'CollisionAvoidance',
    description: 'Collision detection and avoidance',
    
    
  },

  params: {
        safetyMargin: {
      "default": 10,
      "min": 0,
      "max": 50
    }
  },

  inputs: {
        robotPath: 'Transform[]',
    environment: 'Shape[]'
  },

  outputs: {
        safePath: 'Transform[]',
    collisionPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'collisionAvoidance',
      params: {
        robotPath: inputs.robotPath,
        environment: inputs.environment,
        safetyMargin: params.safetyMargin
      }
    });

    return {
      safePath: result,
      collisionPoints: result
    };
  }
};
