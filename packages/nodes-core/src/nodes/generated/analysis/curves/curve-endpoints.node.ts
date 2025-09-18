
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tangentLength: number;
  showTangents: boolean;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  startPoint: Point;
  endPoint: Point;
  startTangent: Vector;
  endTangent: Vector;
}

export const CurveEndpointsNode: NodeDefinition<CurveEndpointsInputs, CurveEndpointsOutputs, CurveEndpointsParams> = {
  type: 'Analysis::CurveEndpoints',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveEndpoints',
    description: 'Extract curve endpoints and tangents',
    
    
  },

  params: {
        tangentLength: {
      "default": 10,
      "min": 1,
      "max": 100
    },
    showTangents: {
      "default": true
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        startPoint: 'Point',
    endPoint: 'Point',
    startTangent: 'Vector',
    endTangent: 'Vector'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveEndpoints',
      params: {
        curve: inputs.curve,
        tangentLength: params.tangentLength,
        showTangents: params.showTangents
      }
    });

    return {
      startPoint: result,
      endPoint: result,
      startTangent: result,
      endTangent: result
    };
  }
};
