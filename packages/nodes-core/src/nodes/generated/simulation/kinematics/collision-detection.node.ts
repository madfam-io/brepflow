
import { NodeDefinition } from '@brepflow/types';

interface Params {
  detectionType: string;
  tolerance: number;
  includeSelfCollision: boolean;
}
interface Inputs {
  bodies: Shape[];
}
interface Outputs {
  collisionPairs: Data;
}

export const CollisionDetectionNode: NodeDefinition<CollisionDetectionInputs, CollisionDetectionOutputs, CollisionDetectionParams> = {
  type: 'Simulation::CollisionDetection',
  category: 'Simulation',
  subcategory: 'Kinematics',

  metadata: {
    label: 'CollisionDetection',
    description: 'Setup collision detection',
    
    
  },

  params: {
        detectionType: {
      "default": "discrete",
      "options": [
        "discrete",
        "continuous"
      ]
    },
    tolerance: {
      "default": 0.1,
      "min": 0.001,
      "max": 10
    },
    includeSelfCollision: {
      "default": true
    }
  },

  inputs: {
        bodies: 'Shape[]'
  },

  outputs: {
        collisionPairs: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'collisionDetection',
      params: {
        bodies: inputs.bodies,
        detectionType: params.detectionType,
        tolerance: params.tolerance,
        includeSelfCollision: params.includeSelfCollision
      }
    });

    return {
      collisionPairs: result
    };
  }
};
