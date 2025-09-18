
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angleUnit: string;
}
interface Inputs {
  value: number;
}
interface Outputs {
  angle: number;
}

export const ArcSineNode: NodeDefinition<ArcSineInputs, ArcSineOutputs, ArcSineParams> = {
  type: 'Math::ArcSine',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'ArcSine',
    description: 'Arc sine function',
    
    
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
        value: 'number'
  },

  outputs: {
        angle: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathAsin',
      params: {
        value: inputs.value,
        angleUnit: params.angleUnit
      }
    });

    return {
      angle: result
    };
  }
};
