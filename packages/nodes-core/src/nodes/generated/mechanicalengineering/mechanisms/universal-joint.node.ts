
import { NodeDefinition } from '@brepflow/types';

interface Params {
  yokeDiameter: number;
  crossPinDiameter: number;
  length: number;
  angle: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  joint: Shape;
  yokes: Shape[];
  cross: Shape;
}

export const UniversalJointNode: NodeDefinition<UniversalJointInputs, UniversalJointOutputs, UniversalJointParams> = {
  type: 'MechanicalEngineering::UniversalJoint',
  category: 'MechanicalEngineering',
  subcategory: 'Mechanisms',

  metadata: {
    label: 'UniversalJoint',
    description: 'Create universal joint',
    
    
  },

  params: {
        yokeDiameter: {
      "default": 30,
      "min": 10,
      "max": 80
    },
    crossPinDiameter: {
      "default": 8,
      "min": 3,
      "max": 20
    },
    length: {
      "default": 60,
      "min": 20,
      "max": 150
    },
    angle: {
      "default": 0,
      "min": 0,
      "max": 45
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        joint: 'Shape',
    yokes: 'Shape[]',
    cross: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'universalJoint',
      params: {
        center: inputs.center,
        yokeDiameter: params.yokeDiameter,
        crossPinDiameter: params.crossPinDiameter,
        length: params.length,
        angle: params.angle
      }
    });

    return {
      joint: result,
      yokes: result,
      cross: result
    };
  }
};
