
import { NodeDefinition } from '@brepflow/types';

interface Params {
  toolLength: number;
  holderDiameter: number;
}
interface Inputs {
  toolpath: Wire[];
  model: Shape;
}
interface Outputs {
  collisions: Point[];
  safePath: Wire[];
}

export const CollisionDetectionNode: NodeDefinition<CollisionDetectionInputs, CollisionDetectionOutputs, CollisionDetectionParams> = {
  type: 'Fabrication::CollisionDetection',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'CollisionDetection',
    description: 'Tool collision checking',
    
    
  },

  params: {
        toolLength: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    holderDiameter: {
      "default": 20,
      "min": 5,
      "max": 100
    }
  },

  inputs: {
        toolpath: 'Wire[]',
    model: 'Shape'
  },

  outputs: {
        collisions: 'Point[]',
    safePath: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'collisionDetection',
      params: {
        toolpath: inputs.toolpath,
        model: inputs.model,
        toolLength: params.toolLength,
        holderDiameter: params.holderDiameter
      }
    });

    return {
      collisions: result,
      safePath: result
    };
  }
};
