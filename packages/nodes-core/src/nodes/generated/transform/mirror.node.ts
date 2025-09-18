
import { NodeDefinition } from '@brepflow/types';

interface Params {
  planeOriginX: number;
  planeOriginY: number;
  planeOriginZ: number;
  planeNormalX: number;
  planeNormalY: number;
  planeNormalZ: number;
  copy: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  mirrored: Shape;
}

export const MirrorNode: NodeDefinition<MirrorInputs, MirrorOutputs, MirrorParams> = {
  type: 'Transform::Mirror',
  category: 'Transform',
  

  metadata: {
    label: 'Mirror',
    description: 'Mirror shape across a plane',
    
    
  },

  params: {
        planeOriginX: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    planeOriginY: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    planeOriginZ: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    planeNormalX: {
      "default": 1,
      "min": -1,
      "max": 1
    },
    planeNormalY: {
      "default": 0,
      "min": -1,
      "max": 1
    },
    planeNormalZ: {
      "default": 0,
      "min": -1,
      "max": 1
    },
    copy: {
      "default": true,
      "description": "Keep original"
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        mirrored: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformMirror',
      params: {
        shape: inputs.shape,
        planeOriginX: params.planeOriginX,
        planeOriginY: params.planeOriginY,
        planeOriginZ: params.planeOriginZ,
        planeNormalX: params.planeNormalX,
        planeNormalY: params.planeNormalY,
        planeNormalZ: params.planeNormalZ,
        copy: params.copy
      }
    });

    return {
      mirrored: result
    };
  }
};
