
import { NodeDefinition } from '@brepflow/types';

interface Params {
  generations: number;
  growthRate: number;
}
interface Inputs {
  seeds: Point[];
  boundary?: Wire;
}
interface Outputs {
  pattern: Wire[];
}

export const VoronoiGrowthNode: NodeDefinition<VoronoiGrowthInputs, VoronoiGrowthOutputs, VoronoiGrowthParams> = {
  type: 'Patterns::VoronoiGrowth',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'VoronoiGrowth',
    description: 'Organic growth pattern',
    
    
  },

  params: {
        generations: {
      "default": 5,
      "min": 1,
      "max": 20,
      "step": 1
    },
    growthRate: {
      "default": 1.5,
      "min": 1,
      "max": 3
    }
  },

  inputs: {
        seeds: 'Point[]',
    boundary: 'Wire'
  },

  outputs: {
        pattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiGrowth',
      params: {
        seeds: inputs.seeds,
        boundary: inputs.boundary,
        generations: params.generations,
        growthRate: params.growthRate
      }
    });

    return {
      pattern: result
    };
  }
};
