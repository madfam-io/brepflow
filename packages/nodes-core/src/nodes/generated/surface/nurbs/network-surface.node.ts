
import { NodeDefinition } from '@brepflow/types';

interface Params {
  continuity: string;
  tolerance: number;
}
interface Inputs {
  uCurves: Wire[];
  vCurves: Wire[];
}
interface Outputs {
  surface: Face;
}

export const NetworkSurfaceNode: NodeDefinition<NetworkSurfaceInputs, NetworkSurfaceOutputs, NetworkSurfaceParams> = {
  type: 'Surface::NetworkSurface',
  category: 'Surface',
  subcategory: 'NURBS',

  metadata: {
    label: 'NetworkSurface',
    description: 'Create surface from curve network',
    
    
  },

  params: {
        continuity: {
      "default": "G1",
      "options": [
        "G0",
        "G1",
        "G2"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    }
  },

  inputs: {
        uCurves: 'Wire[]',
    vCurves: 'Wire[]'
  },

  outputs: {
        surface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'networkSurface',
      params: {
        uCurves: inputs.uCurves,
        vCurves: inputs.vCurves,
        continuity: params.continuity,
        tolerance: params.tolerance
      }
    });

    return {
      surface: result
    };
  }
};
