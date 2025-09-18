
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

export const SineNode: NodeDefinition<SineInputs, SineOutputs, SineParams> = {
  type: 'Math::Sine',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'Sine',
    description: 'Sine function',
    
    
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
      type: 'mathSin',
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
