
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  showConnection: boolean;
}
interface Inputs {
  surface: Face;
  point: Point;
}
interface Outputs {
  closestPoint: Point;
  distance: number;
  uParameter: number;
  vParameter: number;
}

export const SurfaceClosestPointNode: NodeDefinition<SurfaceClosestPointInputs, SurfaceClosestPointOutputs, SurfaceClosestPointParams> = {
  type: 'Analysis::SurfaceClosestPoint',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceClosestPoint',
    description: 'Find closest point on surface',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.001,
      "max": 1
    },
    showConnection: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face',
    point: 'Point'
  },

  outputs: {
        closestPoint: 'Point',
    distance: 'number',
    uParameter: 'number',
    vParameter: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceClosestPoint',
      params: {
        surface: inputs.surface,
        point: inputs.point,
        tolerance: params.tolerance,
        showConnection: params.showConnection
      }
    });

    return {
      closestPoint: result,
      distance: result,
      uParameter: result,
      vParameter: result
    };
  }
};
