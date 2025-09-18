
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  pitch: number;
  height: number;
  wireRadius: number;
  leftHanded: boolean;
}
type Inputs = {};
interface Outputs {
  spring: Solid;
}

export const SpringNode: NodeDefinition<SpringInputs, SpringOutputs, SpringParams> = {
  type: 'Solid::Spring',
  category: 'Solid',
  subcategory: 'Helical',

  metadata: {
    label: 'Spring',
    description: 'Create a spring solid',
    
    
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
    wireRadius: {
      "default": 5,
      "min": 0.1,
      "max": 100
    },
    leftHanded: {
      "default": false
    }
  },

  inputs: {
    
  },

  outputs: {
        spring: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeSpring',
      params: {
        
        radius: params.radius,
        pitch: params.pitch,
        height: params.height,
        wireRadius: params.wireRadius,
        leftHanded: params.leftHanded
      }
    });

    return {
      spring: result
    };
  }
};
