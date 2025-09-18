
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  iterations: number;
  scale: number;
}
interface Inputs {
  seed?: Shape;
}
interface Outputs {
  fractal: Shape;
}

export const FractalGeometryNode: NodeDefinition<FractalGeometryInputs, FractalGeometryOutputs, FractalGeometryParams> = {
  type: 'Specialized::FractalGeometry',
  category: 'Specialized',
  subcategory: 'Organic',

  metadata: {
    label: 'FractalGeometry',
    description: 'Generate fractal geometry',
    
    
  },

  params: {
        type: {
      "default": "koch",
      "options": [
        "koch",
        "sierpinski",
        "menger",
        "julia"
      ]
    },
    iterations: {
      "default": 3,
      "min": 1,
      "max": 7,
      "step": 1
    },
    scale: {
      "default": 100,
      "min": 1,
      "max": 1000
    }
  },

  inputs: {
        seed: 'Shape'
  },

  outputs: {
        fractal: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fractalGeometry',
      params: {
        seed: inputs.seed,
        type: params.type,
        iterations: params.iterations,
        scale: params.scale
      }
    });

    return {
      fractal: result
    };
  }
};
