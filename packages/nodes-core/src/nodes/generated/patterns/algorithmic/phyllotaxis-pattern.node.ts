
import { NodeDefinition } from '@brepflow/types';

interface Params {
  count: number;
  angle: number;
  c: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  points: Point[];
  spiral: Wire;
}

export const PhyllotaxisPatternNode: NodeDefinition<PhyllotaxisPatternInputs, PhyllotaxisPatternOutputs, PhyllotaxisPatternParams> = {
  type: 'Patterns::PhyllotaxisPattern',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'PhyllotaxisPattern',
    description: 'Phyllotaxis spiral pattern',
    
    
  },

  params: {
        count: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    angle: {
      "default": 137.5,
      "min": 0,
      "max": 360
    },
    c: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        points: 'Point[]',
    spiral: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'phyllotaxisPattern',
      params: {
        center: inputs.center,
        count: params.count,
        angle: params.angle,
        c: params.c
      }
    });

    return {
      points: result,
      spiral: result
    };
  }
};
