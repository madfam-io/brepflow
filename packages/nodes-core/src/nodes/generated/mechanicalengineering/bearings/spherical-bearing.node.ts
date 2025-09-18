
import { NodeDefinition } from '@brepflow/types';

interface Params {
  ballDiameter: number;
  boreDiameter: number;
  housingDiameter: number;
  misalignmentAngle: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  bearing: Shape;
  ball: Shape;
  housing: Shape;
}

export const SphericalBearingNode: NodeDefinition<SphericalBearingInputs, SphericalBearingOutputs, SphericalBearingParams> = {
  type: 'MechanicalEngineering::SphericalBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'SphericalBearing',
    description: 'Create spherical bearing for misalignment',
    
    
  },

  params: {
        ballDiameter: {
      "default": 20,
      "min": 5,
      "max": 100
    },
    boreDiameter: {
      "default": 8,
      "min": 3,
      "max": 50
    },
    housingDiameter: {
      "default": 30,
      "min": 10,
      "max": 150
    },
    misalignmentAngle: {
      "default": 15,
      "min": 5,
      "max": 30
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        bearing: 'Shape',
    ball: 'Shape',
    housing: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'sphericalBearing',
      params: {
        center: inputs.center,
        ballDiameter: params.ballDiameter,
        boreDiameter: params.boreDiameter,
        housingDiameter: params.housingDiameter,
        misalignmentAngle: params.misalignmentAngle
      }
    });

    return {
      bearing: result,
      ball: result,
      housing: result
    };
  }
};
