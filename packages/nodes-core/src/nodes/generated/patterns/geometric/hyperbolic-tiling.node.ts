
import { NodeDefinition } from '@brepflow/types';

interface Params {
  p: number;
  q: number;
  iterations: number;
}
interface Inputs {
  disk: Face;
}
interface Outputs {
  tiling: Wire[];
}

export const HyperbolicTilingNode: NodeDefinition<HyperbolicTilingInputs, HyperbolicTilingOutputs, HyperbolicTilingParams> = {
  type: 'Patterns::HyperbolicTiling',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'HyperbolicTiling',
    description: 'Hyperbolic tessellation',
    
    
  },

  params: {
        p: {
      "default": 7,
      "min": 3,
      "max": 12,
      "step": 1
    },
    q: {
      "default": 3,
      "min": 3,
      "max": 12,
      "step": 1
    },
    iterations: {
      "default": 3,
      "min": 1,
      "max": 5,
      "step": 1
    }
  },

  inputs: {
        disk: 'Face'
  },

  outputs: {
        tiling: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'hyperbolicTiling',
      params: {
        disk: inputs.disk,
        p: params.p,
        q: params.q,
        iterations: params.iterations
      }
    });

    return {
      tiling: result
    };
  }
};
