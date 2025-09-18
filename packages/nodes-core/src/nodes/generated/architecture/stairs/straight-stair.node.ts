
import { NodeDefinition } from '@brepflow/types';

interface Params {
  totalRise: number;
  treadDepth: number;
  riserHeight: number;
  width: number;
}
interface Inputs {
  startPoint: Point;
}
interface Outputs {
  staircase: Shape;
  treads: Shape[];
  risers: Shape[];
}

export const StraightStairNode: NodeDefinition<StraightStairInputs, StraightStairOutputs, StraightStairParams> = {
  type: 'Architecture::StraightStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'StraightStair',
    description: 'Straight run staircase',
    
    
  },

  params: {
        totalRise: {
      "default": 3000,
      "min": 1000,
      "max": 6000
    },
    treadDepth: {
      "default": 280,
      "min": 250,
      "max": 350
    },
    riserHeight: {
      "default": 175,
      "min": 150,
      "max": 200
    },
    width: {
      "default": 1200,
      "min": 900,
      "max": 2000
    }
  },

  inputs: {
        startPoint: 'Point'
  },

  outputs: {
        staircase: 'Shape',
    treads: 'Shape[]',
    risers: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'straightStair',
      params: {
        startPoint: inputs.startPoint,
        totalRise: params.totalRise,
        treadDepth: params.treadDepth,
        riserHeight: params.riserHeight,
        width: params.width
      }
    });

    return {
      staircase: result,
      treads: result,
      risers: result
    };
  }
};
