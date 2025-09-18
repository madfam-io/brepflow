
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angleUnit: string;
}
interface Inputs {
  angle: number;
}
interface Outputs {
  result: number;
}

export const CosineNode: NodeDefinition<CosineInputs, CosineOutputs, CosineParams> = {
  type: 'Math::Cosine',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'Cosine',
    description: 'Cosine function',
    
    
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
        angle: 'number'
  },

  outputs: {
        result: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mathCos',
      params: {
        angle: inputs.angle,
        angleUnit: params.angleUnit
      }
    });

    return {
      result: result
    };
  }
};
