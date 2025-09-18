
import { NodeDefinition } from '@brepflow/types';

interface Params {
  points: number;
  outerRadius: number;
  innerRadius: number;
}
interface Inputs {
  center?: Point;
}
interface Outputs {
  star: Wire;
}

export const StarNode: NodeDefinition<StarInputs, StarOutputs, StarParams> = {
  type: 'Sketch::Star',
  category: 'Sketch',
  subcategory: 'Patterns',

  metadata: {
    label: 'Star',
    description: 'Create a star shape',
    
    
  },

  params: {
        points: {
      "default": 5,
      "min": 3,
      "max": 100,
      "step": 1
    },
    outerRadius: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    innerRadius: {
      "default": 40,
      "min": 0.1,
      "max": 10000
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        star: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeStar',
      params: {
        center: inputs.center,
        points: params.points,
        outerRadius: params.outerRadius,
        innerRadius: params.innerRadius
      }
    });

    return {
      star: result
    };
  }
};
