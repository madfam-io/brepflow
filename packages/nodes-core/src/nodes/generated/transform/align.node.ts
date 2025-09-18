
import { NodeDefinition } from '@brepflow/types';

interface Params {
  alignX: string;
  alignY: string;
  alignZ: string;
}
interface Inputs {
  shapes: Shape[];
  reference?: Shape;
}
interface Outputs {
  aligned: Shape[];
}

export const AlignNode: NodeDefinition<AlignInputs, AlignOutputs, AlignParams> = {
  type: 'Transform::Align',
  category: 'Transform',
  

  metadata: {
    label: 'Align',
    description: 'Align shapes to each other',
    
    
  },

  params: {
        alignX: {
      "default": "center",
      "options": [
        "none",
        "min",
        "center",
        "max"
      ]
    },
    alignY: {
      "default": "center",
      "options": [
        "none",
        "min",
        "center",
        "max"
      ]
    },
    alignZ: {
      "default": "none",
      "options": [
        "none",
        "min",
        "center",
        "max"
      ]
    }
  },

  inputs: {
        shapes: 'Shape[]',
    reference: 'Shape'
  },

  outputs: {
        aligned: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformAlign',
      params: {
        shapes: inputs.shapes,
        reference: inputs.reference,
        alignX: params.alignX,
        alignY: params.alignY,
        alignZ: params.alignZ
      }
    });

    return {
      aligned: result
    };
  }
};
