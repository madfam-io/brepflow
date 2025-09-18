
import { NodeDefinition } from '@brepflow/types';

interface Params {
  module: number;
  teeth: number;
  helixAngle: number;
  width: number;
  handedness: string;
}
interface Inputs {
  center?: Point;
}
interface Outputs {
  gear: Shape;
  profile: Wire;
}

export const HelicalGearNode: NodeDefinition<HelicalGearInputs, HelicalGearOutputs, HelicalGearParams> = {
  type: 'MechanicalEngineering::HelicalGear',
  category: 'MechanicalEngineering',
  subcategory: 'Gears',

  metadata: {
    label: 'HelicalGear',
    description: 'Create helical gear with angle',
    
    
  },

  params: {
        module: {
      "default": 2,
      "min": 0.5,
      "max": 20,
      "step": 0.1
    },
    teeth: {
      "default": 20,
      "min": 6,
      "max": 200
    },
    helixAngle: {
      "default": 15,
      "min": 0,
      "max": 45,
      "description": "Helix angle in degrees"
    },
    width: {
      "default": 20,
      "min": 1,
      "max": 200
    },
    handedness: {
      "default": "right",
      "options": [
        "left",
        "right"
      ]
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        gear: 'Shape',
    profile: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'helicalGear',
      params: {
        center: inputs.center,
        module: params.module,
        teeth: params.teeth,
        helixAngle: params.helixAngle,
        width: params.width,
        handedness: params.handedness
      }
    });

    return {
      gear: result,
      profile: result
    };
  }
};
