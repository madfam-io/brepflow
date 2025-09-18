
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  tangencyType: string;
}
interface Inputs {
  curves: Wire[];
  tangentFaces?: Face[];
}
interface Outputs {
  shape: Shape;
}

export const BoundaryNode: NodeDefinition<BoundaryInputs, BoundaryOutputs, BoundaryParams> = {
  type: 'Advanced::Boundary',
  category: 'Advanced',
  subcategory: 'Boundary',

  metadata: {
    label: 'Boundary',
    description: 'Create surface from boundary curves',
    
    
  },

  params: {
        type: {
      "default": "surface",
      "options": [
        "surface",
        "solid"
      ]
    },
    tangencyType: {
      "default": "none",
      "options": [
        "none",
        "tangent",
        "curvature"
      ]
    }
  },

  inputs: {
        curves: 'Wire[]',
    tangentFaces: 'Face[]'
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'boundary',
      params: {
        curves: inputs.curves,
        tangentFaces: inputs.tangentFaces,
        type: params.type,
        tangencyType: params.tangencyType
      }
    });

    return {
      shape: result
    };
  }
};
