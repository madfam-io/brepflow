
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  k: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  points: Point[];
}

export const PoissonDiskNode: NodeDefinition<PoissonDiskInputs, PoissonDiskOutputs, PoissonDiskParams> = {
  type: 'Patterns::PoissonDisk',
  category: 'Patterns',
  subcategory: 'Stochastic',

  metadata: {
    label: 'PoissonDisk',
    description: 'Poisson disk sampling',
    
    
  },

  params: {
        radius: {
      "default": 5,
      "min": 0.1
    },
    k: {
      "default": 30,
      "min": 3,
      "max": 100
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
      type: 'poissonDisk',
      params: {
        boundary: inputs.boundary,
        radius: params.radius,
        k: params.k
      }
    });

    return {
      points: result
    };
  }
};
