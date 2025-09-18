
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  iterations: number;
  dt: number;
}
interface Inputs {
  initial: Point;
}
interface Outputs {
  attractor: Point[];
  trajectory: Wire;
}

export const StrangeAttractorNode: NodeDefinition<StrangeAttractorInputs, StrangeAttractorOutputs, StrangeAttractorParams> = {
  type: 'Patterns::StrangeAttractor',
  category: 'Patterns',
  subcategory: 'Algorithmic',

  metadata: {
    label: 'StrangeAttractor',
    description: 'Strange attractor patterns',
    
    
  },

  params: {
        type: {
      "default": "lorenz",
      "options": [
        "lorenz",
        "rossler",
        "henon",
        "duffing"
      ]
    },
    iterations: {
      "default": 10000,
      "min": 100,
      "max": 100000,
      "step": 100
    },
    dt: {
      "default": 0.01,
      "min": 0.001,
      "max": 0.1
    }
  },

  inputs: {
        initial: 'Point'
  },

  outputs: {
        attractor: 'Point[]',
    trajectory: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'strangeAttractor',
      params: {
        initial: inputs.initial,
        type: params.type,
        iterations: params.iterations,
        dt: params.dt
      }
    });

    return {
      attractor: result,
      trajectory: result
    };
  }
};
