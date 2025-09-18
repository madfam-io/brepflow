
import { NodeDefinition } from '@brepflow/types';

interface Params {
  continuity: string;
  constraintType: string;
}
interface Inputs {
  boundaryEdges: Edge[];
  guideWires?: Wire[];
}
interface Outputs {
  patch: Face;
}

export const PatchSurfaceNode: NodeDefinition<PatchSurfaceInputs, PatchSurfaceOutputs, PatchSurfaceParams> = {
  type: 'Advanced::PatchSurface',
  category: 'Advanced',
  subcategory: 'Surface',

  metadata: {
    label: 'PatchSurface',
    description: 'Create patch surface',
    
    
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
    constraintType: {
      "default": "tangent",
      "options": [
        "none",
        "tangent",
        "curvature"
      ]
    }
  },

  inputs: {
        boundaryEdges: 'Edge[]',
    guideWires: 'Wire[]'
  },

  outputs: {
        patch: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'patchSurface',
      params: {
        boundaryEdges: inputs.boundaryEdges,
        guideWires: inputs.guideWires,
        continuity: params.continuity,
        constraintType: params.constraintType
      }
    });

    return {
      patch: result
    };
  }
};
