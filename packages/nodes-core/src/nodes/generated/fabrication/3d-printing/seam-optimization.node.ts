
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strategy: string;
}
interface Inputs {
  slices: Wire[];
}
interface Outputs {
  optimizedSlices: Wire[];
  seamPoints: Point[];
}

export const SeamOptimizationNode: NodeDefinition<SeamOptimizationInputs, SeamOptimizationOutputs, SeamOptimizationParams> = {
  type: 'Fabrication::SeamOptimization',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'SeamOptimization',
    description: 'Optimize seam placement',
    
    
  },

  params: {
        strategy: {
      "default": "hidden",
      "options": [
        "hidden",
        "aligned",
        "random",
        "shortest"
      ]
    }
  },

  inputs: {
        slices: 'Wire[]'
  },

  outputs: {
        optimizedSlices: 'Wire[]',
    seamPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'seamOptimization',
      params: {
        slices: inputs.slices,
        strategy: params.strategy
      }
    });

    return {
      optimizedSlices: result,
      seamPoints: result
    };
  }
};
