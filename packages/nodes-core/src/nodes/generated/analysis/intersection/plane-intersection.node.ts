
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
}
interface Inputs {
  geometry: Shape;
  plane: Face;
}
interface Outputs {
  intersectionCurves: Wire[];
  sectionProfiles: Wire[];
}

export const PlaneIntersectionNode: NodeDefinition<PlaneIntersectionInputs, PlaneIntersectionOutputs, PlaneIntersectionParams> = {
  type: 'Analysis::PlaneIntersection',
  category: 'Analysis',
  subcategory: 'Intersection',

  metadata: {
    label: 'PlaneIntersection',
    description: 'Intersect geometry with plane',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    }
  },

  inputs: {
        geometry: 'Shape',
    plane: 'Face'
  },

  outputs: {
        intersectionCurves: 'Wire[]',
    sectionProfiles: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'planeIntersection',
      params: {
        geometry: inputs.geometry,
        plane: inputs.plane,
        tolerance: params.tolerance
      }
    });

    return {
      intersectionCurves: result,
      sectionProfiles: result
    };
  }
};
