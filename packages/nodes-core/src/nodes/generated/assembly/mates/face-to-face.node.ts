
import { NodeDefinition } from '@brepflow/types';

interface Params {
  offset: number;
  flip: boolean;
}
interface Inputs {
  face1: Face;
  face2: Face;
}
interface Outputs {
  mated: Shape[];
  mate: Mate;
}

export const FaceToFaceNode: NodeDefinition<FaceToFaceInputs, FaceToFaceOutputs, FaceToFaceParams> = {
  type: 'Assembly::FaceToFace',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'FaceToFace',
    description: 'Mate two faces together',
    
    
  },

  params: {
        offset: {
      "default": 0,
      "min": -1000,
      "max": 1000
    },
    flip: {
      "default": false
    }
  },

  inputs: {
        face1: 'Face',
    face2: 'Face'
  },

  outputs: {
        mated: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mateFaceToFace',
      params: {
        face1: inputs.face1,
        face2: inputs.face2,
        offset: params.offset,
        flip: params.flip
      }
    });

    return {
      mated: result,
      mate: result
    };
  }
};
