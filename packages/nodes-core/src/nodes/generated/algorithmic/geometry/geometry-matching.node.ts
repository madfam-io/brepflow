
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  tolerance: number;
  iterations: number;
}
interface Inputs {
  source: Shape;
  target: Shape;
}
interface Outputs {
  transform: Properties;
  aligned: Shape;
  error: number;
  correspondences: Properties[];
}

export const GeometryMatchingNode: NodeDefinition<GeometryMatchingInputs, GeometryMatchingOutputs, GeometryMatchingParams> = {
  type: 'Algorithmic::GeometryMatching',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'GeometryMatching',
    description: 'Match and align geometries',
    
    
  },

  params: {
        algorithm: {
      "default": "icp",
      "options": [
        "icp",
        "feature",
        "global"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    iterations: {
      "default": 50,
      "min": 10,
      "max": 500
    }
  },

  inputs: {
        source: 'Shape',
    target: 'Shape'
  },

  outputs: {
        transform: 'Properties',
    aligned: 'Shape',
    error: 'number',
    correspondences: 'Properties[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'geometryMatching',
      params: {
        source: inputs.source,
        target: inputs.target,
        algorithm: params.algorithm,
        tolerance: params.tolerance,
        iterations: params.iterations
      }
    });

    return {
      transform: result,
      aligned: result,
      error: result,
      correspondences: result
    };
  }
};
