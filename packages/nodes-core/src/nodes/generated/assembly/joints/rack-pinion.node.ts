
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
}
interface Inputs {
  rack: Shape;
  pinion: Shape;
}
interface Outputs {
  joint: Joint;
}

export const RackPinionNode: NodeDefinition<RackPinionInputs, RackPinionOutputs, RackPinionParams> = {
  type: 'Assembly::RackPinion',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'RackPinion',
    description: 'Create rack and pinion joint',
    
    
  },

  params: {
        module: {
      "default": 1,
      "min": 0.1,
      "max": 100
    }
  },

  inputs: {
        rack: 'Shape',
    pinion: 'Shape'
  },

  outputs: {
        joint: 'Joint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointRackPinion',
      params: {
        rack: inputs.rack,
        pinion: inputs.pinion,
        module: params.module
      }
    });

    return {
      joint: result
    };
  }
};
