
import { NodeDefinition } from '@brepflow/types';

interface Params {
  majorRadius: number;
  minorRadius: number;
  startParam: number;
  endParam: number;
}
interface Inputs {
  center?: Point;
}
interface Outputs {
  curve: Wire;
}

export const HyperbolaNode: NodeDefinition<HyperbolaInputs, HyperbolaOutputs, HyperbolaParams> = {
  type: 'Sketch::Hyperbola',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Hyperbola',
    description: 'Create a hyperbolic curve',
    
    
  },

  params: {
        majorRadius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    minorRadius: {
      "default": 30,
      "min": 0.1,
      "max": 10000
    },
    startParam: {
      "default": -2,
      "min": -10,
      "max": 10
    },
    endParam: {
      "default": 2,
      "min": -10,
      "max": 10
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeHyperbola',
      params: {
        center: inputs.center,
        majorRadius: params.majorRadius,
        minorRadius: params.minorRadius,
        startParam: params.startParam,
        endParam: params.endParam
      }
    });

    return {
      curve: result
    };
  }
};
