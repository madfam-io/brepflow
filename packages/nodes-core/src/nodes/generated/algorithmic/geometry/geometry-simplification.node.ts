
import { NodeDefinition } from '@brepflow/types';

interface Params {
  algorithm: string;
  reduction: number;
  preserveBoundary: boolean;
}
interface Inputs {
  geometry: Shape;
}
interface Outputs {
  simplified: Shape;
  reductionRatio: number;
  error: number;
}

export const GeometrySimplificationNode: NodeDefinition<GeometrySimplificationInputs, GeometrySimplificationOutputs, GeometrySimplificationParams> = {
  type: 'Algorithmic::GeometrySimplification',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'GeometrySimplification',
    description: 'Simplify complex geometry',
    
    
  },

  params: {
        algorithm: {
      "default": "quadric",
      "options": [
        "decimate",
        "quadric",
        "vertex"
      ]
    },
    reduction: {
      "default": 0.5,
      "min": 0.1,
      "max": 0.9
    },
    preserveBoundary: {
      "default": true
    }
  },

  inputs: {
        geometry: 'Shape'
  },

  outputs: {
        simplified: 'Shape',
    reductionRatio: 'number',
    error: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'geometrySimplification',
      params: {
        geometry: inputs.geometry,
        algorithm: params.algorithm,
        reduction: params.reduction,
        preserveBoundary: params.preserveBoundary
      }
    });

    return {
      simplified: result,
      reductionRatio: result,
      error: result
    };
  }
};
