
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

export const ArcCosineNode: NodeDefinition<ArcCosineInputs, ArcCosineOutputs, ArcCosineParams> = {
  type: 'Math::ArcCosine',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'ArcCosine',
    description: 'Arc cosine function',
    
    
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
      type: 'mathAcos',
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
