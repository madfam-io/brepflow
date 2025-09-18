
import { NodeDefinition } from '@brepflow/types';

interface Params {
  orientation: string;
  showBox: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  boundingBox: Shape;
  minPoint: Point;
  maxPoint: Point;
  dimensions: Vector;
}

export const CurveBoundingBoxNode: NodeDefinition<CurveBoundingBoxInputs, CurveBoundingBoxOutputs, CurveBoundingBoxParams> = {
  type: 'Analysis::CurveBoundingBox',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveBoundingBox',
    description: 'Calculate oriented bounding box',
    
    
  },

  params: {
        orientation: {
      "default": "axis-aligned",
      "options": [
        "axis-aligned",
        "minimal"
      ]
    },
    showBox: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        boundingBox: 'Shape',
    minPoint: 'Point',
    maxPoint: 'Point',
    dimensions: 'Vector'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveBoundingBox',
      params: {
        curve: inputs.curve,
        orientation: params.orientation,
        showBox: params.showBox
      }
    });

    return {
      boundingBox: result,
      minPoint: result,
      maxPoint: result,
      dimensions: result
    };
  }
};
