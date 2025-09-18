
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

export const ArcTangentNode: NodeDefinition<ArcTangentInputs, ArcTangentOutputs, ArcTangentParams> = {
  type: 'Math::ArcTangent',
  category: 'Math',
  subcategory: 'Trigonometry',

  metadata: {
    label: 'ArcTangent',
    description: 'Arc tangent function',
    
    
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
      type: 'mathAtan',
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
