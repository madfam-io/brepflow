
import { NodeDefinition } from '@brepflow/types';

interface Params {
  minHeight: number;
  maxHeight: number;
  quality: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  layerHeights: Number[];
}

export const AdaptiveLayerHeightNode: NodeDefinition<AdaptiveLayerHeightInputs, AdaptiveLayerHeightOutputs, AdaptiveLayerHeightParams> = {
  type: 'Fabrication::AdaptiveLayerHeight',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'AdaptiveLayerHeight',
    description: 'Adaptive layer height calculation',
    
    
  },

  params: {
        minHeight: {
      "default": 0.1,
      "min": 0.05,
      "max": 0.5
    },
    maxHeight: {
      "default": 0.3,
      "min": 0.1,
      "max": 1
    },
    quality: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        layerHeights: 'Number[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'adaptiveLayerHeight',
      params: {
        model: inputs.model,
        minHeight: params.minHeight,
        maxHeight: params.maxHeight,
        quality: params.quality
      }
    });

    return {
      layerHeights: result
    };
  }
};
