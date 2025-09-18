
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
  pattern: Shape;
}

export const ReactionDiffusionNode: NodeDefinition<ReactionDiffusionInputs, ReactionDiffusionOutputs, ReactionDiffusionParams> = {
  type: 'Specialized::ReactionDiffusion',
  category: 'Specialized',
  subcategory: 'Organic',

  metadata: {
    label: 'ReactionDiffusion',
    description: 'Reaction-diffusion patterns',
    
    
  },

  params: {
        pattern: {
      "default": "spots",
      "options": [
        "spots",
        "stripes",
        "labyrinth",
        "holes"
      ]
    },
    scale: {
      "default": 10,
      "min": 1,
      "max": 100
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
        pattern: 'Shape'
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
