
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  pitch: number;
  height: number;
  leftHanded: boolean;
}
type Inputs = {};
interface Outputs {
  helix: Wire;
}

export const HelixNode: NodeDefinition<HelixInputs, HelixOutputs, HelixParams> = {
  type: 'Solid::Helix',
  category: 'Solid',
  subcategory: 'Helical',

  metadata: {
    label: 'Helix',
    description: 'Create a helical curve',
    
    
  },

  params: {
        radius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    pitch: {
      "default": 20,
      "min": 0.1,
      "max": 10000
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    leftHanded: {
      "default": false
    }
  },

  inputs: {
    
  },

  outputs: {
        helix: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeHelix',
      params: {
        
        radius: params.radius,
        pitch: params.pitch,
        height: params.height,
        leftHanded: params.leftHanded
      }
    });

    return {
      helix: result
    };
  }
};
