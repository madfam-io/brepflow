
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
}
interface Inputs {
  container: Face;
  rectangles: Face[];
}
interface Outputs {
  packed: Face[];
  transforms: Transform[];
}

export const RectanglePackingNode: NodeDefinition<RectanglePackingInputs, RectanglePackingOutputs, RectanglePackingParams> = {
  type: 'Patterns::RectanglePacking',
  category: 'Patterns',
  subcategory: 'Packing',

  metadata: {
    label: 'RectanglePacking',
    description: 'Rectangle packing algorithm',
    
    
  },

  params: {
        algorithm: {
      "default": "maxrects",
      "options": [
        "guillotine",
        "maxrects",
        "skyline",
        "shelf"
      ]
    }
  },

  inputs: {
        container: 'Face',
    rectangles: 'Face[]'
  },

  outputs: {
        packed: 'Face[]',
    transforms: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rectanglePacking',
      params: {
        container: inputs.container,
        rectangles: inputs.rectangles,
        algorithm: params.algorithm
      }
    });

    return {
      packed: result,
      transforms: result
    };
  }
};
