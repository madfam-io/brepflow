
import { NodeDefinition } from '@brepflow/types';

interface Params {
  height: number;
  angle: number;
  roundEdges: boolean;
}
interface Inputs {
  targetFace: Face;
  pattern: Wire;
}
interface Outputs {
  embossed: Shape;
}

export const EmbossNode: NodeDefinition<EmbossInputs, EmbossOutputs, EmbossParams> = {
  type: 'Specialized::Emboss',
  category: 'Specialized',
  subcategory: 'Text',

  metadata: {
    label: 'Emboss',
    description: 'Emboss text or pattern',
    
    
  },

  params: {
        height: {
      "default": 1,
      "min": 0.01,
      "max": 100
    },
    angle: {
      "default": 45,
      "min": 0,
      "max": 90
    },
    roundEdges: {
      "default": true
    }
  },

  inputs: {
        targetFace: 'Face',
    pattern: 'Wire'
  },

  outputs: {
        embossed: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'emboss',
      params: {
        targetFace: inputs.targetFace,
        pattern: inputs.pattern,
        height: params.height,
        angle: params.angle,
        roundEdges: params.roundEdges
      }
    });

    return {
      embossed: result
    };
  }
};
