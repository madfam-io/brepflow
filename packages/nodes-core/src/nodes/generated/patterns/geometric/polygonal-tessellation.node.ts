
import { NodeDefinition } from '@brepflow/types';

interface Params {
  polygonType: string;
  size: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  tiles: Face[];
}

export const PolygonalTessellationNode: NodeDefinition<PolygonalTessellationInputs, PolygonalTessellationOutputs, PolygonalTessellationParams> = {
  type: 'Patterns::PolygonalTessellation',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'PolygonalTessellation',
    description: 'Regular polygon tessellation',
    
    
  },

  params: {
        polygonType: {
      "default": "hexagonal",
      "options": [
        "triangular",
        "square",
        "hexagonal",
        "octagonal"
      ]
    },
    size: {
      "default": 10,
      "min": 1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        tiles: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'polygonTessellation',
      params: {
        boundary: inputs.boundary,
        polygonType: params.polygonType,
        size: params.size
      }
    });

    return {
      tiles: result
    };
  }
};
