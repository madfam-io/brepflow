
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerDiameter: number;
  outerDiameter: number;
  height: number;
  type: string;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  bearing: Shape;
  raceways: Shape[];
}

export const ThrustBearingNode: NodeDefinition<ThrustBearingInputs, ThrustBearingOutputs, ThrustBearingParams> = {
  type: 'MechanicalEngineering::ThrustBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'ThrustBearing',
    description: 'Create thrust bearing for axial loads',
    
    
  },

  params: {
        innerDiameter: {
      "default": 20,
      "min": 5,
      "max": 150
    },
    outerDiameter: {
      "default": 40,
      "min": 15,
      "max": 300
    },
    height: {
      "default": 10,
      "min": 3,
      "max": 50
    },
    type: {
      "default": "ball",
      "options": [
        "ball",
        "roller",
        "needle"
      ]
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        bearing: 'Shape',
    raceways: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'thrustBearing',
      params: {
        center: inputs.center,
        innerDiameter: params.innerDiameter,
        outerDiameter: params.outerDiameter,
        height: params.height,
        type: params.type
      }
    });

    return {
      bearing: result,
      raceways: result
    };
  }
};
