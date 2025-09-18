
import { NodeDefinition } from '@brepflow/types';

interface Params {
  thickness: number;
  texture: string;
}
interface Inputs {
  floorSurface: Face;
}
interface Outputs {
  epoxyFloor: Face;
}

export const EpoxyFloorNode: NodeDefinition<EpoxyFloorInputs, EpoxyFloorOutputs, EpoxyFloorParams> = {
  type: 'Architecture::EpoxyFloor',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'EpoxyFloor',
    description: 'Epoxy floor coating system',
    
    
  },

  params: {
        thickness: {
      "default": 3,
      "min": 2,
      "max": 10
    },
    texture: {
      "default": "smooth",
      "options": [
        "smooth",
        "orange-peel",
        "quartz",
        "flake"
      ]
    }
  },

  inputs: {
        floorSurface: 'Face'
  },

  outputs: {
        epoxyFloor: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'epoxyFloor',
      params: {
        floorSurface: inputs.floorSurface,
        thickness: params.thickness,
        texture: params.texture
      }
    });

    return {
      epoxyFloor: result
    };
  }
};
