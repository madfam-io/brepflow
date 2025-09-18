
import { NodeDefinition } from '@brepflow/types';

interface Params {
  alignToOrigin: boolean;
  alignCorner: string;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  aligned: Shape;
  boundingBox: Shape;
}

export const BoundingBoxAlignNode: NodeDefinition<BoundingBoxAlignInputs, BoundingBoxAlignOutputs, BoundingBoxAlignParams> = {
  type: 'Transform::BoundingBoxAlign',
  category: 'Transform',
  

  metadata: {
    label: 'BoundingBoxAlign',
    description: 'Align shape to its bounding box',
    
    
  },

  params: {
        alignToOrigin: {
      "default": true
    },
    alignCorner: {
      "default": "min",
      "options": [
        "min",
        "center",
        "max"
      ]
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        aligned: 'Shape',
    boundingBox: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformBBoxAlign',
      params: {
        shape: inputs.shape,
        alignToOrigin: params.alignToOrigin,
        alignCorner: params.alignCorner
      }
    });

    return {
      aligned: result,
      boundingBox: result
    };
  }
};
