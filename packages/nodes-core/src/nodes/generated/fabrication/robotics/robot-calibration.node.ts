
import { NodeDefinition } from '@brepflow/types';

interface Params {
  method: string;
}
interface Inputs {
  measurementPoints: Point[];
}
interface Outputs {
  calibrationMatrix: Transform;
  accuracy: Number;
}

export const RobotCalibrationNode: NodeDefinition<RobotCalibrationInputs, RobotCalibrationOutputs, RobotCalibrationParams> = {
  type: 'Fabrication::RobotCalibration',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'RobotCalibration',
    description: 'Robot calibration routine',
    
    
  },

  params: {
        method: {
      "default": "dh-parameters",
      "options": [
        "dh-parameters",
        "circle-point",
        "plane",
        "hand-eye"
      ]
    }
  },

  inputs: {
        measurementPoints: 'Point[]'
  },

  outputs: {
        calibrationMatrix: 'Transform',
    accuracy: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'robotCalibration',
      params: {
        measurementPoints: inputs.measurementPoints,
        method: params.method
      }
    });

    return {
      calibrationMatrix: result,
      accuracy: result
    };
  }
};
