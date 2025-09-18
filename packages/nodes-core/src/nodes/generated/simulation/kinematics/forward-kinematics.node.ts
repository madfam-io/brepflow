
import { NodeDefinition } from '@brepflow/types';

interface Params {
  timeStep: number;
  duration: number;
}
interface Inputs {
  mechanism: Data;
  jointValues: number[];
}
interface Outputs {
  endEffectorPose: Data;
  trajectory: Wire;
}

export const ForwardKinematicsNode: NodeDefinition<ForwardKinematicsInputs, ForwardKinematicsOutputs, ForwardKinematicsParams> = {
  type: 'Simulation::ForwardKinematics',
  category: 'Simulation',
  subcategory: 'Kinematics',

  metadata: {
    label: 'ForwardKinematics',
    description: 'Calculate forward kinematics',
    
    
  },

  params: {
        timeStep: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    },
    duration: {
      "default": 1,
      "min": 0.01,
      "max": 100
    }
  },

  inputs: {
        mechanism: 'Data',
    jointValues: 'number[]'
  },

  outputs: {
        endEffectorPose: 'Data',
    trajectory: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'forwardKinematics',
      params: {
        mechanism: inputs.mechanism,
        jointValues: inputs.jointValues,
        timeStep: params.timeStep,
        duration: params.duration
      }
    });

    return {
      endEffectorPose: result,
      trajectory: result
    };
  }
};
