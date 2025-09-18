
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ratio: number;
}
interface Inputs {
  pulley1: Shape;
  pulley2: Shape;
}
interface Outputs {
  joint: Joint;
}

export const BeltNode: NodeDefinition<BeltInputs, BeltOutputs, BeltParams> = {
  type: 'Assembly::Belt',
  category: 'Assembly',
  subcategory: 'Joints',

  metadata: {
    label: 'Belt',
    description: 'Create belt/chain constraint',
    
    
  },

  params: {
        ratio: {
      "default": 1,
      "min": 0.1,
      "max": 100
    }
  },

  inputs: {
        pulley1: 'Shape',
    pulley2: 'Shape'
  },

  outputs: {
        joint: 'Joint'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'jointBelt',
      params: {
        pulley1: inputs.pulley1,
        pulley2: inputs.pulley2,
        ratio: params.ratio
      }
    });

    return {
      joint: result
    };
  }
};
