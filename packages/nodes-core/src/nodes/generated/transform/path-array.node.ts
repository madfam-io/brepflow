
import { NodeDefinition } from '@brepflow/types';

interface Params {
  count: number;
  alignToPath: boolean;
  spacing: string;
  distance: number;
  merge: boolean;
}
interface Inputs {
  shape: Shape;
  path: Wire;
}
interface Outputs {
  array: Shape[];
  merged: Shape;
}

export const PathArrayNode: NodeDefinition<PathArrayInputs, PathArrayOutputs, PathArrayParams> = {
  type: 'Transform::PathArray',
  category: 'Transform',
  

  metadata: {
    label: 'PathArray',
    description: 'Array shapes along a path',
    
    
  },

  params: {
        count: {
      "default": 10,
      "min": 2,
      "max": 1000,
      "step": 1
    },
    alignToPath: {
      "default": true
    },
    spacing: {
      "default": "equal",
      "options": [
        "equal",
        "distance"
      ]
    },
    distance: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    merge: {
      "default": false
    }
  },

  inputs: {
        shape: 'Shape',
    path: 'Wire'
  },

  outputs: {
        array: 'Shape[]',
    merged: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'transformPathArray',
      params: {
        shape: inputs.shape,
        path: inputs.path,
        count: params.count,
        alignToPath: params.alignToPath,
        spacing: params.spacing,
        distance: params.distance,
        merge: params.merge
      }
    });

    return {
      array: result,
      merged: result
    };
  }
};
