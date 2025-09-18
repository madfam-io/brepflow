
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
  angle: number;
  roundCorners: boolean;
}
interface Inputs {
  targetFace: Face;
  pattern: Wire;
}
interface Outputs {
  engraved: Shape;
}

export const EngraveNode: NodeDefinition<EngraveInputs, EngraveOutputs, EngraveParams> = {
  type: 'Specialized::Engrave',
  category: 'Specialized',
  subcategory: 'Text',

  metadata: {
    label: 'Engrave',
    description: 'Engrave text or pattern',
    
    
  },

  params: {
        depth: {
      "default": 1,
      "min": 0.01,
      "max": 100
    },
    angle: {
      "default": 45,
      "min": 0,
      "max": 90,
      "description": "Draft angle"
    },
    roundCorners: {
      "default": true
    }
  },

  inputs: {
        targetFace: 'Face',
    pattern: 'Wire'
  },

  outputs: {
        engraved: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'engrave',
      params: {
        targetFace: inputs.targetFace,
        pattern: inputs.pattern,
        depth: params.depth,
        angle: params.angle,
        roundCorners: params.roundCorners
      }
    });

    return {
      engraved: result
    };
  }
};
