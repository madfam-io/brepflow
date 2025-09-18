
import { NodeDefinition } from '@brepflow/types';

interface Params {
  levels: number;
  climb: boolean;
  compensation: string;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  contours: Wire[];
}

export const ContouringToolpathNode: NodeDefinition<ContouringToolpathInputs, ContouringToolpathOutputs, ContouringToolpathParams> = {
  type: 'Fabrication::ContouringToolpath',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ContouringToolpath',
    description: 'Contour machining paths',
    
    
  },

  params: {
        levels: {
      "default": 10,
      "min": 1,
      "max": 100,
      "step": 1
    },
    climb: {
      "default": true
    },
    compensation: {
      "default": "right",
      "options": [
        "left",
        "right",
        "center"
      ]
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        contours: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'contouringToolpath',
      params: {
        surface: inputs.surface,
        levels: params.levels,
        climb: params.climb,
        compensation: params.compensation
      }
    });

    return {
      contours: result
    };
  }
};
