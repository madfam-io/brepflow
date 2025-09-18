
import { NodeDefinition } from '@brepflow/types';

interface Params {
  innerDiameter: number;
  outerDiameter: number;
  width: number;
  ballCount: number;
  showCage: boolean;
}
interface Inputs {
  center: Point;
  axis?: Vector;
}
interface Outputs {
  bearing: Shape;
  innerRace: Shape;
  outerRace: Shape;
}

export const BallBearingNode: NodeDefinition<BallBearingInputs, BallBearingOutputs, BallBearingParams> = {
  type: 'MechanicalEngineering::BallBearing',
  category: 'MechanicalEngineering',
  subcategory: 'Bearings',

  metadata: {
    label: 'BallBearing',
    description: 'Create ball bearing assembly',
    
    
  },

  params: {
        innerDiameter: {
      "default": 20,
      "min": 3,
      "max": 200,
      "description": "Bore diameter in mm"
    },
    outerDiameter: {
      "default": 47,
      "min": 10,
      "max": 400,
      "description": "Outer diameter in mm"
    },
    width: {
      "default": 14,
      "min": 3,
      "max": 100,
      "description": "Width in mm"
    },
    ballCount: {
      "default": 8,
      "min": 5,
      "max": 20
    },
    showCage: {
      "default": true
    }
  },

  inputs: {
        center: 'Point',
    axis: 'Vector'
  },

  outputs: {
        bearing: 'Shape',
    innerRace: 'Shape',
    outerRace: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'ballBearing',
      params: {
        center: inputs.center,
        axis: inputs.axis,
        innerDiameter: params.innerDiameter,
        outerDiameter: params.outerDiameter,
        width: params.width,
        ballCount: params.ballCount,
        showCage: params.showCage
      }
    });

    return {
      bearing: result,
      innerRace: result,
      outerRace: result
    };
  }
};
