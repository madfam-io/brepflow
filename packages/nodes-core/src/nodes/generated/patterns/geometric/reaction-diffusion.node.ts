
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pattern: string;
  scale: number;
  iterations: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  pattern: Wire[];
}

export const ReactionDiffusionNode: NodeDefinition<ReactionDiffusionInputs, ReactionDiffusionOutputs, ReactionDiffusionParams> = {
  type: 'Patterns::ReactionDiffusion',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'ReactionDiffusion',
    description: 'Reaction-diffusion pattern',
    
    
  },

  params: {
        pattern: {
      "default": "spots",
      "options": [
        "spots",
        "stripes",
        "labyrinth",
        "honeycomb"
      ]
    },
    scale: {
      "default": 10,
      "min": 1
    },
    iterations: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        pattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'reactionDiffusion',
      params: {
        surface: inputs.surface,
        pattern: params.pattern,
        scale: params.scale,
        iterations: params.iterations
      }
    });

    return {
      pattern: result
    };
  }
};
