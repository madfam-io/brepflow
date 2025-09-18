
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angleUnit: string;
}
interface Inputs {
  y: number;
  x: number;
}
interface Outputs {
  angle: number;
}

export const ArcTangent2Node: NodeDefinition<ArcTangent2Inputs, ArcTangent2Outputs, ArcTangent2Params> = {
  type: 'Math::ArcTangent2',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'ArcTangent2',
    description: 'Two-argument arc tangent',
    
    
  },

  params: {
        angleUnit: {
      "default": "radians",
      "options": [
        "radians",
        "degrees"
      ]
    }
  },

  inputs: {
        y: 'number',
    x: 'number'
  },

  outputs: {
        angle: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathAtan2',
      params: {
        y: inputs.y,
        x: inputs.x,
        angleUnit: params.angleUnit
      }
    });

    return {
      angle: result
    };
  }
};
