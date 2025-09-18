
import { NodeDefinition } from '@brepflow/types';

interface Params {
  count: number;
  minDistance: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  points: Point[];
}

export const BlueNoiseNode: NodeDefinition<BlueNoiseInputs, BlueNoiseOutputs, BlueNoiseParams> = {
  type: 'Patterns::BlueNoise',
  category: 'Patterns',
  subcategory: 'Stochastic',

  metadata: {
    label: 'BlueNoise',
    description: 'Blue noise distribution',
    
    
  },

  params: {
        count: {
      "default": 100,
      "min": 10,
      "max": 10000,
      "step": 10
    },
    minDistance: {
      "default": 1,
      "min": 0.1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        points: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'blueNoise',
      params: {
        boundary: inputs.boundary,
        count: params.count,
        minDistance: params.minDistance
      }
    });

    return {
      points: result
    };
  }
};
