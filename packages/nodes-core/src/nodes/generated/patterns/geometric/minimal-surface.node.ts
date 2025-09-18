
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  period: number;
}
interface Inputs {
  box: Box;
}
interface Outputs {
  surface: Face[];
}

export const MinimalSurfaceNode: NodeDefinition<MinimalSurfaceInputs, MinimalSurfaceOutputs, MinimalSurfaceParams> = {
  type: 'Patterns::MinimalSurface',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'MinimalSurface',
    description: 'Minimal surface pattern',
    
    
  },

  params: {
        type: {
      "default": "gyroid",
      "options": [
        "gyroid",
        "schwarz",
        "diamond",
        "neovius"
      ]
    },
    period: {
      "default": 10,
      "min": 1
    }
  },

  inputs: {
        box: 'Box'
  },

  outputs: {
        surface: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'minimalSurface',
      params: {
        box: inputs.box,
        type: params.type,
        period: params.period
      }
    });

    return {
      surface: result
    };
  }
};
