
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  showConnection: boolean;
}
interface Inputs {
  curve: Wire;
  point: Point;
}
interface Outputs {
  closestPoint: Point;
  distance: number;
  parameter: number;
  connectionLine: Wire;
}

export const CurveClosestPointNode: NodeDefinition<CurveClosestPointInputs, CurveClosestPointOutputs, CurveClosestPointParams> = {
  type: 'Analysis::CurveClosestPoint',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveClosestPoint',
    description: 'Find closest point on curve to reference',
    
    
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
        curve: 'Wire',
    point: 'Point'
  },

  outputs: {
        closestPoint: 'Point',
    distance: 'number',
    parameter: 'number',
    connectionLine: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveClosestPoint',
      params: {
        curve: inputs.curve,
        point: inputs.point,
        tolerance: params.tolerance,
        showConnection: params.showConnection
      }
    });

    return {
      closestPoint: result,
      distance: result,
      parameter: result,
      connectionLine: result
    };
  }
};
