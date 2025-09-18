
import { NodeDefinition } from '@brepflow/types';

interface Params {
  rules: string;
  depth: number;
}
interface Inputs {
  canvas: Face;
}
interface Outputs {
  art: Shape[];
}

export const ContextFreeArtNode: NodeDefinition<ContextFreeArtInputs, ContextFreeArtOutputs, ContextFreeArtParams> = {
  type: 'Patterns::ContextFreeArt',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'ContextFreeArt',
    description: 'Context-free art generation',
    
    
  },

  params: {
        rules: {
      "default": "CIRCLE{},SQUARE{r 45}"
    },
    depth: {
      "default": 10,
      "min": 1,
      "max": 20,
      "step": 1
    }
  },

  inputs: {
        canvas: 'Face'
  },

  outputs: {
        art: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'contextFreeArt',
      params: {
        canvas: inputs.canvas,
        rules: params.rules,
        depth: params.depth
      }
    });

    return {
      art: result
    };
  }
};
