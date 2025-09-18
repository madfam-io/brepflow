
import { NodeDefinition } from '@brepflow/types';

interface Params {
  countX: number;
  countY: number;
  countZ: number;
  spacingX: number;
  spacingY: number;
  spacingZ: number;
  merge: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  array: Shape[];
  merged: Shape;
}

export const GridArrayNode: NodeDefinition<GridArrayInputs, GridArrayOutputs, GridArrayParams> = {
  type: 'Transform::GridArray',
  category: 'Transform',
  

  metadata: {
    label: 'GridArray',
    description: 'Create 2D or 3D grid array',
    
    
  },

  params: {
        countX: {
      "default": 3,
      "min": 1,
      "max": 100,
      "step": 1
    },
    countY: {
      "default": 3,
      "min": 1,
      "max": 100,
      "step": 1
    },
    countZ: {
      "default": 1,
      "min": 1,
      "max": 100,
      "step": 1
    },
    spacingX: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    spacingY: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    spacingZ: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    merge: {
      "default": false
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        array: 'Shape[]',
    merged: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformGridArray',
      params: {
        shape: inputs.shape,
        countX: params.countX,
        countY: params.countY,
        countZ: params.countZ,
        spacingX: params.spacingX,
        spacingY: params.spacingY,
        spacingZ: params.spacingZ,
        merge: params.merge
      }
    });

    return {
      array: result,
      merged: result
    };
  }
};
