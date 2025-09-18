
import { NodeDefinition } from '@brepflow/types';

interface Params {
  precision: number;
  showCentroid: boolean;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  area: number;
  centroid: Point;
  boundaryLength: number;
}

export const SurfaceAreaNode: NodeDefinition<SurfaceAreaInputs, SurfaceAreaOutputs, SurfaceAreaParams> = {
  type: 'Analysis::SurfaceArea',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceArea',
    description: 'Calculate surface area and properties',
    
    
  },

  params: {
        precision: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showCentroid: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        area: 'number',
    centroid: 'Point',
    boundaryLength: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceArea',
      params: {
        surface: inputs.surface,
        precision: params.precision,
        showCentroid: params.showCentroid
      }
    });

    return {
      area: result,
      centroid: result,
      boundaryLength: result
    };
  }
};
