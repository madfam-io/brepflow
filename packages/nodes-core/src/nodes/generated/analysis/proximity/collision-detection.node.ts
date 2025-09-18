
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  showCollisions: boolean;
}
interface Inputs {
  objects: Shape[];
}
interface Outputs {
  hasCollisions: boolean;
  collidingPairs: Shape[][];
  collisionRegions: Shape[];
}

export const CollisionDetectionNode: NodeDefinition<CollisionDetectionInputs, CollisionDetectionOutputs, CollisionDetectionParams> = {
  type: 'Analysis::CollisionDetection',
  category: 'Analysis',
  subcategory: 'Proximity',

  metadata: {
    label: 'CollisionDetection',
    description: 'Detect collisions between objects',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showCollisions: {
      "default": true
    }
  },

  inputs: {
        objects: 'Shape[]'
  },

  outputs: {
        hasCollisions: 'boolean',
    collidingPairs: 'Shape[][]',
    collisionRegions: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'collisionDetection',
      params: {
        objects: inputs.objects,
        tolerance: params.tolerance,
        showCollisions: params.showCollisions
      }
    });

    return {
      hasCollisions: result,
      collidingPairs: result,
      collisionRegions: result
    };
  }
};
