
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ruled: boolean;
  closed: boolean;
  solid: boolean;
  maxDegree: number;
}
interface Inputs {
  profiles: Wire[];
  guides?: Wire[];
  centerLine?: Wire;
}
interface Outputs {
  shape: Shape;
}

export const LoftNode: NodeDefinition<LoftInputs, LoftOutputs, LoftParams> = {
  type: 'Advanced::Loft',
  category: 'Advanced',
  subcategory: 'Loft',

  metadata: {
    label: 'Loft',
    description: 'Loft between profiles',
    
    
  },

  params: {
        ruled: {
      "default": false,
      "description": "Straight sections between profiles"
    },
    closed: {
      "default": false,
      "description": "Close loft to first profile"
    },
    solid: {
      "default": true
    },
    maxDegree: {
      "default": 3,
      "min": 1,
      "max": 10
    }
  },

  inputs: {
        profiles: 'Wire[]',
    guides: 'Wire[]',
    centerLine: 'Wire'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'loft',
      params: {
        profiles: inputs.profiles,
        guides: inputs.guides,
        centerLine: inputs.centerLine,
        ruled: params.ruled,
        closed: params.closed,
        solid: params.solid,
        maxDegree: params.maxDegree
      }
    });

    return {
      shape: result
    };
  }
};
