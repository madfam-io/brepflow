
import { NodeDefinition } from '@brepflow/types';

interface Params {
  weaveType: string;
  warpCount: number;
  weftCount: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  weave: Wire[];
}

export const WeavePatternNode: NodeDefinition<WeavePatternInputs, WeavePatternOutputs, WeavePatternParams> = {
  type: 'Patterns::WeavePattern',
  category: 'Patterns',
  subcategory: 'Tiling',

  metadata: {
    label: 'WeavePattern',
    description: 'Weaving patterns',
    
    
  },

  params: {
        weaveType: {
      "default": "plain",
      "options": [
        "plain",
        "twill",
        "satin",
        "basket"
      ]
    },
    warpCount: {
      "default": 10,
      "min": 2,
      "max": 50,
      "step": 1
    },
    weftCount: {
      "default": 10,
      "min": 2,
      "max": 50,
      "step": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        weave: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'weavePattern',
      params: {
        boundary: inputs.boundary,
        weaveType: params.weaveType,
        warpCount: params.warpCount,
        weftCount: params.weftCount
      }
    });

    return {
      weave: result
    };
  }
};
