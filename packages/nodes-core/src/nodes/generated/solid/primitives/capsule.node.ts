
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  height: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const CapsuleNode: NodeDefinition<CapsuleInputs, CapsuleOutputs, CapsuleParams> = {
  type: 'Solid::Capsule',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Capsule',
    description: 'Create a capsule (cylinder with hemisphere caps)',
    
    
  },

  params: {
        radius: {
      "default": 25,
      "min": 0.1,
      "max": 10000,
      "description": "Capsule radius"
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000,
      "description": "Cylindrical section height"
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeCapsule',
      params: {
        
        radius: params.radius,
        height: params.height
      }
    });

    return {
      solid: result
    };
  }
};
