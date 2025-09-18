
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  maxDistance: number;
}
interface Inputs {
  rayOrigin: Point;
  rayDirection: Vector;
  targets: Shape[];
}
interface Outputs {
  hitPoints: Point[];
  hitDistances: number[];
  hitNormals: Vector[];
}

export const RayIntersectionNode: NodeDefinition<RayIntersectionInputs, RayIntersectionOutputs, RayIntersectionParams> = {
  type: 'Analysis::RayIntersection',
  category: 'Analysis',
  subcategory: 'Intersection',

  metadata: {
    label: 'RayIntersection',
    description: 'Cast ray and find intersections',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    maxDistance: {
      "default": 1000,
      "min": 1,
      "max": 10000
    }
  },

  inputs: {
        rayOrigin: 'Point',
    rayDirection: 'Vector',
    targets: 'Shape[]'
  },

  outputs: {
        hitPoints: 'Point[]',
    hitDistances: 'number[]',
    hitNormals: 'Vector[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rayIntersection',
      params: {
        rayOrigin: inputs.rayOrigin,
        rayDirection: inputs.rayDirection,
        targets: inputs.targets,
        tolerance: params.tolerance,
        maxDistance: params.maxDistance
      }
    });

    return {
      hitPoints: result,
      hitDistances: result,
      hitNormals: result
    };
  }
};
