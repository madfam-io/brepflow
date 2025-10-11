import type { NodeDefinition } from '@brepflow/types';

interface SeamOptimizationParams {
  strategy: string;
}

interface SeamOptimizationInputs {
  slices: unknown;
}

interface SeamOptimizationOutputs {
  optimizedSlices: unknown;
  seamPoints: Array<[number, number, number]>;
}

export const SeamOptimizationNode: NodeDefinition<SeamOptimizationInputs, SeamOptimizationOutputs, SeamOptimizationParams> = {
  id: 'Fabrication::SeamOptimization',
  category: 'Fabrication',
  label: 'SeamOptimization',
  description: 'Optimize seam placement',
  inputs: {
    slices: {
      type: 'Wire[]',
      label: 'Slices',
      required: true
    }
  },
  outputs: {
    optimizedSlices: {
      type: 'Wire[]',
      label: 'Optimized Slices'
    },
    seamPoints: {
      type: 'Point[]',
      label: 'Seam Points'
    }
  },
  params: {
    strategy: {
      type: 'enum',
      label: 'Strategy',
      default: "hidden",
      options: ["hidden","aligned","random","shortest"]
    }
  },
  async evaluate(context, inputs, params) {
    const results = await context.geometry.execute({
      type: 'seamOptimization',
      params: {
        slices: inputs.slices,
        strategy: params.strategy
      }
    });
    
    return {
      optimizedSlices: results.optimizedSlices,
      seamPoints: results.seamPoints
    };
  },
};
