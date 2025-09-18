
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bond: string;
  brickLength: number;
  brickWidth: number;
  mortarGap: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  bricks: Face[];
}

export const BrickPatternNode: NodeDefinition<BrickPatternInputs, BrickPatternOutputs, BrickPatternParams> = {
  type: 'Patterns::BrickPattern',
  category: 'Patterns',
  subcategory: 'Tiling',

  metadata: {
    label: 'BrickPattern',
    description: 'Brick laying pattern',
    
    
  },

  params: {
        bond: {
      "default": "running",
      "options": [
        "running",
        "stack",
        "english",
        "flemish",
        "herringbone"
      ]
    },
    brickLength: {
      "default": 20,
      "min": 1
    },
    brickWidth: {
      "default": 10,
      "min": 1
    },
    mortarGap: {
      "default": 1,
      "min": 0
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        bricks: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'brickPattern',
      params: {
        surface: inputs.surface,
        bond: params.bond,
        brickLength: params.brickLength,
        brickWidth: params.brickWidth,
        mortarGap: params.mortarGap
      }
    });

    return {
      bricks: result
    };
  }
};
