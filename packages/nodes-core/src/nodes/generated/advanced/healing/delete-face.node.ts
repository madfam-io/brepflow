
import { NodeDefinition } from '@brepflow/types';

interface Params {
  healingType: string;
}
interface Inputs {
  shape: Shape;
  facesToDelete: Face[];
}
interface Outputs {
  result: Shape;
}

export const DeleteFaceNode: NodeDefinition<DeleteFaceInputs, DeleteFaceOutputs, DeleteFaceParams> = {
  type: 'Advanced::DeleteFace',
  category: 'Advanced',
  subcategory: 'Healing',

  metadata: {
    label: 'DeleteFace',
    description: 'Delete and heal faces',
    
    
  },

  params: {
        healingType: {
      "default": "extend",
      "options": [
        "cap",
        "extend",
        "none"
      ]
    }
  },

  inputs: {
        shape: 'Shape',
    facesToDelete: 'Face[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'deleteFace',
      params: {
        shape: inputs.shape,
        facesToDelete: inputs.facesToDelete,
        healingType: params.healingType
      }
    });

    return {
      result: result
    };
  }
};
