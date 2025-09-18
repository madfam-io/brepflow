
import { NodeDefinition } from '@brepflow/types';

interface Params {
  baseRadius: number;
  lift: number;
  profileType: string;
  dwellAngle: number;
}
interface Inputs {
  center: Point;
  customProfile?: Wire;
}
interface Outputs {
  cam: Shape;
  profile: Wire;
}

export const CamProfileNode: NodeDefinition<CamProfileInputs, CamProfileOutputs, CamProfileParams> = {
  type: 'MechanicalEngineering::CamProfile',
  category: 'MechanicalEngineering',
  subcategory: 'Mechanisms',

  metadata: {
    label: 'CamProfile',
    description: 'Create cam profile',
    
    
  },

  params: {
        baseRadius: {
      "default": 30,
      "min": 10,
      "max": 100
    },
    lift: {
      "default": 10,
      "min": 2,
      "max": 50
    },
    profileType: {
      "default": "harmonic",
      "options": [
        "harmonic",
        "cycloidal",
        "parabolic",
        "custom"
      ]
    },
    dwellAngle: {
      "default": 60,
      "min": 0,
      "max": 180
    }
  },

  inputs: {
        center: 'Point',
    customProfile: 'Wire'
  },

  outputs: {
        cam: 'Shape',
    profile: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'camProfile',
      params: {
        center: inputs.center,
        customProfile: inputs.customProfile,
        baseRadius: params.baseRadius,
        lift: params.lift,
        profileType: params.profileType,
        dwellAngle: params.dwellAngle
      }
    });

    return {
      cam: result,
      profile: result
    };
  }
};
