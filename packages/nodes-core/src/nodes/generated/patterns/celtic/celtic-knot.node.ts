
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  width: number;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  knot: Wire[];
}

export const CelticKnotNode: NodeDefinition<CelticKnotInputs, CelticKnotOutputs, CelticKnotParams> = {
  type: 'Patterns::CelticKnot',
  category: 'Patterns',
  subcategory: 'Celtic',

  metadata: {
    label: 'CelticKnot',
    description: 'Celtic knot pattern',
    
    
  },

  params: {
        type: {
      "default": "trinity",
      "options": [
        "trinity",
        "spiral",
        "maze",
        "cross"
      ]
    },
    width: {
      "default": 2,
      "min": 0.5,
      "max": 5
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        knot: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'celticKnot',
      params: {
        path: inputs.path,
        type: params.type,
        width: params.width
      }
    });

    return {
      knot: result
    };
  }
};
