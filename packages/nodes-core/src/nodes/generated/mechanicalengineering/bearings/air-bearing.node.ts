
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  thickness: number;
  pocketCount: number;
  restrictorType: string;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  bearing: Shape;
  pockets: Face[];
  restrictors: Wire[];
}

export const AirBearingNode: NodeDefinition<AirBearingInputs, AirBearingOutputs, AirBearingParams> = {
  type: 'MechanicalEngineering::AirBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'AirBearing',
    description: 'Create air bearing design',
    
    
  },

  params: {
        diameter: {
      "default": 50,
      "min": 20,
      "max": 200
    },
    thickness: {
      "default": 10,
      "min": 5,
      "max": 30
    },
    pocketCount: {
      "default": 6,
      "min": 3,
      "max": 12
    },
    restrictorType: {
      "default": "orifice",
      "options": [
        "orifice",
        "porous",
        "groove"
      ]
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        bearing: 'Shape',
    pockets: 'Face[]',
    restrictors: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'airBearing',
      params: {
        center: inputs.center,
        diameter: params.diameter,
        thickness: params.thickness,
        pocketCount: params.pocketCount,
        restrictorType: params.restrictorType
      }
    });

    return {
      bearing: result,
      pockets: result,
      restrictors: result
    };
  }
};
