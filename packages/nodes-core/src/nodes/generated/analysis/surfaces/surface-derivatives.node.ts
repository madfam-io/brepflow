
import { NodeDefinition } from '@brepflow/types';

interface Params {
  u: number;
  v: number;
  order: number;
  vectorScale: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  point: Point;
  duVector: Vector;
  dvVector: Vector;
  normal: Vector;
}

export const SurfaceDerivativesNode: NodeDefinition<SurfaceDerivativesInputs, SurfaceDerivativesOutputs, SurfaceDerivativesParams> = {
  type: 'Analysis::SurfaceDerivatives',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceDerivatives',
    description: 'Calculate surface derivatives',
    
    
  },

  params: {
        u: {
      "default": 0.5,
      "min": 0,
      "max": 1
    },
    v: {
      "default": 0.5,
      "min": 0,
      "max": 1
    },
    order: {
      "default": 2,
      "min": 1,
      "max": 3
    },
    vectorScale: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        point: 'Point',
    duVector: 'Vector',
    dvVector: 'Vector',
    normal: 'Vector'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceDerivatives',
      params: {
        surface: inputs.surface,
        u: params.u,
        v: params.v,
        order: params.order,
        vectorScale: params.vectorScale
      }
    });

    return {
      point: result,
      duVector: result,
      dvVector: result,
      normal: result
    };
  }
};
