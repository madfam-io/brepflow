
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

export const TangentNode: NodeDefinition<TangentInputs, TangentOutputs, TangentParams> = {
  type: 'Math::Tangent',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'Tangent',
    description: 'Tangent function',
    
    
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
      type: 'mathTan',
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
