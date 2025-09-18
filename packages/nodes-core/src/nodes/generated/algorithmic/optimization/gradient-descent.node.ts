
import { NodeDefinition } from '@brepflow/types';

interface Params {
  learningRate: number;
  maxIterations: number;
  tolerance: number;
  momentum: number;
}
interface Inputs {
  objective: Properties;
  initialPoint: Point;
}
interface Outputs {
  optimumPoint: Point;
  optimumValue: number;
  trajectory: Point[];
  convergence: number[];
}

export const GradientDescentNode: NodeDefinition<GradientDescentInputs, GradientDescentOutputs, GradientDescentParams> = {
  type: 'Algorithmic::GradientDescent',
  category: 'Algorithmic',
  subcategory: 'Optimization',

  metadata: {
    label: 'GradientDescent',
    description: 'Gradient descent optimization',
    
    
  },

  params: {
        learningRate: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    maxIterations: {
      "default": 1000,
      "min": 10,
      "max": 10000
    },
    tolerance: {
      "default": 0.001,
      "min": 0.000001,
      "max": 0.1
    },
    momentum: {
      "default": 0.9,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        objective: 'Properties',
    initialPoint: 'Point'
  },

  outputs: {
        optimumPoint: 'Point',
    optimumValue: 'number',
    trajectory: 'Point[]',
    convergence: 'number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'gradientDescent',
      params: {
        objective: inputs.objective,
        initialPoint: inputs.initialPoint,
        learningRate: params.learningRate,
        maxIterations: params.maxIterations,
        tolerance: params.tolerance,
        momentum: params.momentum
      }
    });

    return {
      optimumPoint: result,
      optimumValue: result,
      trajectory: result,
      convergence: result
    };
  }
};
