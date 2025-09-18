
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cReal: number;
  cImag: number;
  iterations: number;
  resolution: number;
}
interface Inputs {
  bounds: Box;
}
interface Outputs {
  fractal: Mesh;
}

export const JuliaSetNode: NodeDefinition<JuliaSetInputs, JuliaSetOutputs, JuliaSetParams> = {
  type: 'Patterns::JuliaSet',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'JuliaSet',
    description: 'Julia set fractal',
    
    
  },

  params: {
        cReal: {
      "default": -0.7,
      "min": -2,
      "max": 2
    },
    cImag: {
      "default": 0.27,
      "min": -2,
      "max": 2
    },
    iterations: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    resolution: {
      "default": 100,
      "min": 50,
      "max": 500,
      "step": 10
    }
  },

  inputs: {
        bounds: 'Box'
  },

  outputs: {
        fractal: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'juliaSet',
      params: {
        bounds: inputs.bounds,
        cReal: params.cReal,
        cImag: params.cImag,
        iterations: params.iterations,
        resolution: params.resolution
      }
    });

    return {
      fractal: result
    };
  }
};
