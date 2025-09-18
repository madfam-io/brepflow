
import { NodeDefinition } from '@brepflow/types';

interface Params {
  points: number;
  variation: string;
}
interface Inputs {
  plane?: Plane;
}
interface Outputs {
  fern: Point[];
}

export const BarnsleyFernNode: NodeDefinition<BarnsleyFernInputs, BarnsleyFernOutputs, BarnsleyFernParams> = {
  type: 'Patterns::BarnsleyFern',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'BarnsleyFern',
    description: 'Barnsley fern fractal',
    
    
  },

  params: {
        points: {
      "default": 10000,
      "min": 100,
      "max": 100000,
      "step": 100
    },
    variation: {
      "default": "classic",
      "options": [
        "classic",
        "thelypteridaceae",
        "leptosporangiate"
      ]
    }
  },

  inputs: {
        plane: 'Plane'
  },

  outputs: {
        fern: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'barnsleyFern',
      params: {
        plane: inputs.plane,
        points: params.points,
        variation: params.variation
      }
    });

    return {
      fern: result
    };
  }
};
