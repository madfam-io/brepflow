
import { NodeDefinition } from '@brepflow/types';

interface Params {
  rotations: boolean;
  angleStep: number;
}
interface Inputs {
  container: Face;
  polygons: Face[];
}
interface Outputs {
  packed: Face[];
  utilization: Number;
}

export const PolygonPackingNode: NodeDefinition<PolygonPackingInputs, PolygonPackingOutputs, PolygonPackingParams> = {
  type: 'Patterns::PolygonPacking',
  category: 'Patterns',
  subcategory: 'Packing',

  metadata: {
    label: 'PolygonPacking',
    description: 'Irregular polygon packing',
    
    
  },

  params: {
        rotations: {
      "default": true
    },
    angleStep: {
      "default": 90,
      "min": 1,
      "max": 180
    }
  },

  inputs: {
        container: 'Face',
    polygons: 'Face[]'
  },

  outputs: {
        packed: 'Face[]',
    utilization: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'polygonPacking',
      params: {
        container: inputs.container,
        polygons: inputs.polygons,
        rotations: params.rotations,
        angleStep: params.angleStep
      }
    });

    return {
      packed: result,
      utilization: result
    };
  }
};
