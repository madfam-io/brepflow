
import { NodeDefinition } from '@brepflow/types';

interface Params {
  style: string;
  scale: number;
}
interface Inputs {
  region: Face;
}
interface Outputs {
  pattern: Wire[];
}

export const MoorishPatternNode: NodeDefinition<MoorishPatternInputs, MoorishPatternOutputs, MoorishPatternParams> = {
  type: 'Patterns::MoorishPattern',
  category: 'Patterns',
  subcategory: 'Islamic',

  metadata: {
    label: 'MoorishPattern',
    description: 'Moorish geometric pattern',
    
    
  },

  params: {
        style: {
      "default": "alhambra",
      "options": [
        "alhambra",
        "cordoba",
        "seville",
        "granada"
      ]
    },
    scale: {
      "default": 10,
      "min": 1
    }
  },

  inputs: {
        region: 'Face'
  },

  outputs: {
        pattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'moorishPattern',
      params: {
        region: inputs.region,
        style: params.style,
        scale: params.scale
      }
    });

    return {
      pattern: result
    };
  }
};
