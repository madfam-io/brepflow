
import { NodeDefinition } from '@brepflow/types';

interface Params {
  offset: number;
  fillGaps: boolean;
  extend: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  offsetShape: Shape;
}

export const OffsetSurfaceNode: NodeDefinition<OffsetSurfaceInputs, OffsetSurfaceOutputs, OffsetSurfaceParams> = {
  type: 'Advanced::OffsetSurface',
  category: 'Advanced',
  subcategory: 'Thickness',

  metadata: {
    label: 'OffsetSurface',
    description: 'Offset surface or solid',
    
    
  },

  params: {
        offset: {
      "default": 5,
      "min": -1000,
      "max": 1000
    },
    fillGaps: {
      "default": true
    },
    extend: {
      "default": false
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        offsetShape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'offsetSurface',
      params: {
        shape: inputs.shape,
        offset: params.offset,
        fillGaps: params.fillGaps,
        extend: params.extend
      }
    });

    return {
      offsetShape: result
    };
  }
};
