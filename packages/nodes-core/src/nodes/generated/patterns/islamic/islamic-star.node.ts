
import { NodeDefinition } from '@brepflow/types';

interface Params {
  points: number;
  innerRadius: number;
  rotation: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  pattern: Wire;
}

export const IslamicStarNode: NodeDefinition<IslamicStarInputs, IslamicStarOutputs, IslamicStarParams> = {
  type: 'Patterns::IslamicStar',
  category: 'Patterns',
  subcategory: 'Islamic',

  metadata: {
    label: 'IslamicStar',
    description: 'Islamic star pattern',
    
    
  },

  params: {
        points: {
      "default": 8,
      "min": 3,
      "max": 24,
      "step": 1
    },
    innerRadius: {
      "default": 0.5,
      "min": 0.1,
      "max": 0.9
    },
    rotation: {
      "default": 0,
      "min": -180,
      "max": 180
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        pattern: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'islamicStar',
      params: {
        center: inputs.center,
        points: params.points,
        innerRadius: params.innerRadius,
        rotation: params.rotation
      }
    });

    return {
      pattern: result
    };
  }
};
