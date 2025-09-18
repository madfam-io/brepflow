
import { NodeDefinition } from '@brepflow/types';

interface Params {
  particles: number;
  stickiness: number;
}
interface Inputs {
  seed: Point;
}
interface Outputs {
  aggregate: Point[];
}

export const DiffusionLimitedAggregationNode: NodeDefinition<DiffusionLimitedAggregationInputs, DiffusionLimitedAggregationOutputs, DiffusionLimitedAggregationParams> = {
  type: 'Patterns::DiffusionLimitedAggregation',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'DiffusionLimitedAggregation',
    description: 'DLA growth pattern',
    
    
  },

  params: {
        particles: {
      "default": 1000,
      "min": 100,
      "max": 10000,
      "step": 100
    },
    stickiness: {
      "default": 1,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        seed: 'Point'
  },

  outputs: {
        aggregate: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'dlaPattern',
      params: {
        seed: inputs.seed,
        particles: params.particles,
        stickiness: params.stickiness
      }
    });

    return {
      aggregate: result
    };
  }
};
