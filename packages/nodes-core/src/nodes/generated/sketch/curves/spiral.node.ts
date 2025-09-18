
import { NodeDefinition } from '@brepflow/types';

interface Params {
  startRadius: number;
  endRadius: number;
  turns: number;
  type: string;
}
interface Inputs {
  center?: Point;
}
interface Outputs {
  spiral: Wire;
}

export const SpiralNode: NodeDefinition<SpiralInputs, SpiralOutputs, SpiralParams> = {
  type: 'Sketch::Spiral',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Spiral',
    description: 'Create a 2D spiral',
    
    
  },

  params: {
        startRadius: {
      "default": 10,
      "min": 0,
      "max": 10000
    },
    endRadius: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    turns: {
      "default": 3,
      "min": 0.1,
      "max": 100
    },
    type: {
      "default": "archimedean",
      "options": [
        "archimedean",
        "logarithmic"
      ]
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        spiral: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeSpiral2D',
      params: {
        center: inputs.center,
        startRadius: params.startRadius,
        endRadius: params.endRadius,
        turns: params.turns,
        type: params.type
      }
    });

    return {
      spiral: result
    };
  }
};
