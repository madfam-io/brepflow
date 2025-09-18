
import { NodeDefinition } from '@brepflow/types';

interface Params {
  checkType: string;
  tolerance: number;
}
interface Inputs {
  surface1: Face;
  surface2: Face;
  edge?: Edge;
}
interface Outputs {
  isContinuous: boolean;
  deviations: Data;
}

export const ContinuityCheckNode: NodeDefinition<ContinuityCheckInputs, ContinuityCheckOutputs, ContinuityCheckParams> = {
  type: 'Surface::ContinuityCheck',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'ContinuityCheck',
    description: 'Check surface continuity',
    
    
  },

  params: {
        checkType: {
      "default": "G1",
      "options": [
        "G0",
        "G1",
        "G2",
        "G3"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    }
  },

  inputs: {
        surface1: 'Face',
    surface2: 'Face',
    edge: 'Edge'
  },

  outputs: {
        isContinuous: 'boolean',
    deviations: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'continuityCheck',
      params: {
        surface1: inputs.surface1,
        surface2: inputs.surface2,
        edge: inputs.edge,
        checkType: params.checkType,
        tolerance: params.tolerance
      }
    });

    return {
      isContinuous: result,
      deviations: result
    };
  }
};
