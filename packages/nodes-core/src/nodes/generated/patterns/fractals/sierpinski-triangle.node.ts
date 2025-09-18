
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
  filled: boolean;
}
interface Inputs {
  triangle: Face;
}
interface Outputs {
  fractal: Face[];
}

export const SierpinskiTriangleNode: NodeDefinition<SierpinskiTriangleInputs, SierpinskiTriangleOutputs, SierpinskiTriangleParams> = {
  type: 'Patterns::SierpinskiTriangle',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'SierpinskiTriangle',
    description: 'Sierpinski triangle',
    
    
  },

  params: {
        iterations: {
      "default": 5,
      "min": 0,
      "max": 10,
      "step": 1
    },
    filled: {
      "default": true
    }
  },

  inputs: {
        triangle: 'Face'
  },

  outputs: {
        fractal: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sierpinskiTriangle',
      params: {
        triangle: inputs.triangle,
        iterations: params.iterations,
        filled: params.filled
      }
    });

    return {
      fractal: result
    };
  }
};
