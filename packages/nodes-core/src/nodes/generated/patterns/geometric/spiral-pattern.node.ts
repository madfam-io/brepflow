
import { NodeDefinition } from '@brepflow/types';

interface Params {
  spiralType: string;
  turns: number;
  growth: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  spiral: Wire;
}

export const SpiralPatternNode: NodeDefinition<SpiralPatternInputs, SpiralPatternOutputs, SpiralPatternParams> = {
  type: 'Patterns::SpiralPattern',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'SpiralPattern',
    description: 'Spiral-based pattern',
    
    
  },

  params: {
        spiralType: {
      "default": "logarithmic",
      "options": [
        "archimedean",
        "logarithmic",
        "fermat",
        "golden"
      ]
    },
    turns: {
      "default": 5,
      "min": 0.5,
      "max": 20
    },
    growth: {
      "default": 1.2,
      "min": 1,
      "max": 3
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        spiral: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'spiralPattern',
      params: {
        center: inputs.center,
        spiralType: params.spiralType,
        turns: params.turns,
        growth: params.growth
      }
    });

    return {
      spiral: result
    };
  }
};
