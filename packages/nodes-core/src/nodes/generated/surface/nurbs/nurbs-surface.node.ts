
import { NodeDefinition } from '@brepflow/types';

interface Params {
  degreeU: number;
  degreeV: number;
  periodicU: boolean;
  periodicV: boolean;
}
interface Inputs {
  controlPoints: Point[][];
  weights?: number[][];
  knotsU?: number[];
  knotsV?: number[];
}
interface Outputs {
  surface: Face;
}

export const NurbsSurfaceNode: NodeDefinition<NurbsSurfaceInputs, NurbsSurfaceOutputs, NurbsSurfaceParams> = {
  type: 'Surface::NurbsSurface',
  category: 'Surface',
  subcategory: 'NURBS',

  metadata: {
    label: 'NurbsSurface',
    description: 'Create NURBS surface from control points',
    
    
  },

  params: {
        degreeU: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    degreeV: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    periodicU: {
      "default": false
    },
    periodicV: {
      "default": false
    }
  },

  inputs: {
        controlPoints: 'Point[][]',
    weights: 'number[][]',
    knotsU: 'number[]',
    knotsV: 'number[]'
  },

  outputs: {
        surface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'nurbsSurface',
      params: {
        controlPoints: inputs.controlPoints,
        weights: inputs.weights,
        knotsU: inputs.knotsU,
        knotsV: inputs.knotsV,
        degreeU: params.degreeU,
        degreeV: params.degreeV,
        periodicU: params.periodicU,
        periodicV: params.periodicV
      }
    });

    return {
      surface: result
    };
  }
};
