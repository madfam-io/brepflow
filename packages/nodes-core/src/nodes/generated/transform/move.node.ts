
import { NodeDefinition } from '@brepflow/types';

interface Params {
  x: number;
  y: number;
  z: number;
  copy: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  moved: Shape;
}

export const MoveNode: NodeDefinition<MoveInputs, MoveOutputs, MoveParams> = {
  type: 'Transform::Move',
  category: 'Transform',
  

  metadata: {
    label: 'Move',
    description: 'Translate shape in 3D space',
    
    
  },

  params: {
        x: {
      "default": 0,
      "min": -10000,
      "max": 10000,
      "description": "X translation"
    },
    y: {
      "default": 0,
      "min": -10000,
      "max": 10000,
      "description": "Y translation"
    },
    z: {
      "default": 0,
      "min": -10000,
      "max": 10000,
      "description": "Z translation"
    },
    copy: {
      "default": true,
      "description": "Create copy or move original"
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        moved: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformMove',
      params: {
        shape: inputs.shape,
        x: params.x,
        y: params.y,
        z: params.z,
        copy: params.copy
      }
    });

    return {
      moved: result
    };
  }
};
