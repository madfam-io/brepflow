
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minSize: number;
  removeHoles: boolean;
  removeFillets: boolean;
  removeChamfers: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  simplified: Shape;
}

export const RemoveFeaturesNode: NodeDefinition<RemoveFeaturesInputs, RemoveFeaturesOutputs, RemoveFeaturesParams> = {
  type: 'Advanced::RemoveFeatures',
  category: 'Advanced',
  subcategory: 'Healing',

  metadata: {
    label: 'RemoveFeatures',
    description: 'Remove small features',
    
    
  },

  params: {
        minSize: {
      "default": 0.5,
      "min": 0.01,
      "max": 100
    },
    removeHoles: {
      "default": true
    },
    removeFillets: {
      "default": false
    },
    removeChamfers: {
      "default": false
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        simplified: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'removeFeatures',
      params: {
        shape: inputs.shape,
        minSize: params.minSize,
        removeHoles: params.removeHoles,
        removeFillets: params.removeFillets,
        removeChamfers: params.removeChamfers
      }
    });

    return {
      simplified: result
    };
  }
};
