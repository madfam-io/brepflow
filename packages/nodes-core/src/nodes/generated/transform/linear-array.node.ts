
import { NodeDefinition } from '@brepflow/types';

interface Params {
  count: number;
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

export const LinearArrayNode: NodeDefinition<LinearArrayInputs, LinearArrayOutputs, LinearArrayParams> = {
  type: 'Transform::LinearArray',
  category: 'Transform',
  

  metadata: {
    label: 'LinearArray',
    description: 'Create linear array of shapes',
    
    
  },

  params: {
        count: {
      "default": 5,
      "min": 2,
      "max": 1000,
      "step": 1
    },
    spacingX: {
      "default": 100,
      "min": -10000,
      "max": 10000
    },
    spacingY: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    spacingZ: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    merge: {
      "default": false,
      "description": "Merge into single shape"
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
      type: 'transformLinearArray',
      params: {
        shape: inputs.shape,
        count: params.count,
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
