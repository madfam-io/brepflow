
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
  resolution: number;
  zoom: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  fractal: Mesh;
}

export const MandelbrotSetNode: NodeDefinition<MandelbrotSetInputs, MandelbrotSetOutputs, MandelbrotSetParams> = {
  type: 'Patterns::MandelbrotSet',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'MandelbrotSet',
    description: 'Mandelbrot set',
    
    
  },

  params: {
        iterations: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    resolution: {
      "default": 200,
      "min": 50,
      "max": 1000,
      "step": 10
    },
    zoom: {
      "default": 1,
      "min": 0.1,
      "max": 1000
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        fractal: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mandelbrotSet',
      params: {
        center: inputs.center,
        iterations: params.iterations,
        resolution: params.resolution,
        zoom: params.zoom
      }
    });

    return {
      fractal: result
    };
  }
};
