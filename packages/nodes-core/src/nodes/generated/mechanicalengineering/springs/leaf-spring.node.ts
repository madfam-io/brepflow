
import { NodeDefinition } from '@brepflow/types';

interface Params {
  leafCount: number;
  length: number;
  width: number;
  thickness: number;
  camber: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  assembly: Shape;
  leaves: Shape[];
}

export const LeafSpringNode: NodeDefinition<LeafSpringInputs, LeafSpringOutputs, LeafSpringParams> = {
  type: 'MechanicalEngineering::LeafSpring',
  category: 'MechanicalEngineering',
  subcategory: 'Springs',

  metadata: {
    label: 'LeafSpring',
    description: 'Create leaf spring assembly',
    
    
  },

  params: {
        leafCount: {
      "default": 5,
      "min": 1,
      "max": 10
    },
    length: {
      "default": 500,
      "min": 100,
      "max": 1500
    },
    width: {
      "default": 50,
      "min": 20,
      "max": 150
    },
    thickness: {
      "default": 6,
      "min": 3,
      "max": 15
    },
    camber: {
      "default": 50,
      "min": 0,
      "max": 150
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        assembly: 'Shape',
    leaves: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'leafSpring',
      params: {
        center: inputs.center,
        leafCount: params.leafCount,
        length: params.length,
        width: params.width,
        thickness: params.thickness,
        camber: params.camber
      }
    });

    return {
      assembly: result,
      leaves: result
    };
  }
};
