
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerDiameter: number;
  outerDiameter: number;
  width: number;
  rollerType: string;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  bearing: Shape;
  rollers: Shape[];
}

export const RollerBearingNode: NodeDefinition<RollerBearingInputs, RollerBearingOutputs, RollerBearingParams> = {
  type: 'MechanicalEngineering::RollerBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'RollerBearing',
    description: 'Create roller bearing',
    
    
  },

  params: {
        innerDiameter: {
      "default": 25,
      "min": 5,
      "max": 200
    },
    outerDiameter: {
      "default": 52,
      "min": 15,
      "max": 400
    },
    width: {
      "default": 15,
      "min": 5,
      "max": 100
    },
    rollerType: {
      "default": "cylindrical",
      "options": [
        "cylindrical",
        "tapered",
        "spherical"
      ]
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        bearing: 'Shape',
    rollers: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rollerBearing',
      params: {
        center: inputs.center,
        innerDiameter: params.innerDiameter,
        outerDiameter: params.outerDiameter,
        width: params.width,
        rollerType: params.rollerType
      }
    });

    return {
      bearing: result,
      rollers: result
    };
  }
};
