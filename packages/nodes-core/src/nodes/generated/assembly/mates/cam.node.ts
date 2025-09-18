
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  cam: Shape;
  follower: Shape;
}
interface Outputs {
  cammed: Shape[];
  mate: Mate;
}

export const CamNode: NodeDefinition<CamInputs, CamOutputs, CamParams> = {
  type: 'Assembly::Cam',
  category: 'Assembly',
  subcategory: 'Mates',

  metadata: {
    label: 'Cam',
    description: 'Create cam-follower relationship',
    
    
  },

  params: {
    
  },

  inputs: {
        cam: 'Shape',
    follower: 'Shape'
  },

  outputs: {
        cammed: 'Shape[]',
    mate: 'Mate'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mateCam',
      params: {
        cam: inputs.cam,
        follower: inputs.follower
        
      }
    });

    return {
      cammed: result,
      mate: result
    };
  }
};
