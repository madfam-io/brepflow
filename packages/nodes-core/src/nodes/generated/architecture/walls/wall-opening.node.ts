
import { NodeDefinition } from '@brepflow/types';

interface Params {
  width: number;
  height: number;
  sillHeight: number;
}
interface Inputs {
  wall: Shape;
  position: Point;
}
interface Outputs {
  wallWithOpening: Shape;
  opening: Face;
}

export const WallOpeningNode: NodeDefinition<WallOpeningInputs, WallOpeningOutputs, WallOpeningParams> = {
  type: 'Architecture::WallOpening',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'WallOpening',
    description: 'Create opening in wall',
    
    
  },

  params: {
        width: {
      "default": 900,
      "min": 100,
      "max": 5000
    },
    height: {
      "default": 2100,
      "min": 100,
      "max": 5000
    },
    sillHeight: {
      "default": 0,
      "min": 0,
      "max": 2000
    }
  },

  inputs: {
        wall: 'Shape',
    position: 'Point'
  },

  outputs: {
        wallWithOpening: 'Shape',
    opening: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'wallOpening',
      params: {
        wall: inputs.wall,
        position: inputs.position,
        width: params.width,
        height: params.height,
        sillHeight: params.sillHeight
      }
    });

    return {
      wallWithOpening: result,
      opening: result
    };
  }
};
