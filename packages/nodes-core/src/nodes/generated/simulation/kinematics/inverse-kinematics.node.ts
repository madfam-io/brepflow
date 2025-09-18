
import { NodeDefinition } from '@brepflow/types';

interface Params {
  solver: string;
  maxIterations: number;
  tolerance: number;
}
interface Inputs {
  mechanism: Data;
  targetPose: Data;
}
interface Outputs {
  jointValues: number[];
  reachable: boolean;
}

export const InverseKinematicsNode: NodeDefinition<InverseKinematicsInputs, InverseKinematicsOutputs, InverseKinematicsParams> = {
  type: 'Simulation::InverseKinematics',
  category: 'Simulation',
  subcategory: 'Kinematics',

  metadata: {
    label: 'InverseKinematics',
    description: 'Calculate inverse kinematics',
    
    
  },

  params: {
        solver: {
      "default": "jacobian",
      "options": [
        "jacobian",
        "ccd",
        "fabrik"
      ]
    },
    maxIterations: {
      "default": 100,
      "min": 10,
      "max": 1000,
      "step": 10
    },
    tolerance: {
      "default": 0.001,
      "min": 0.0001,
      "max": 0.1
    }
  },

  inputs: {
        mechanism: 'Data',
    targetPose: 'Data'
  },

  outputs: {
        jointValues: 'number[]',
    reachable: 'boolean'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'inverseKinematics',
      params: {
        mechanism: inputs.mechanism,
        targetPose: inputs.targetPose,
        solver: params.solver,
        maxIterations: params.maxIterations,
        tolerance: params.tolerance
      }
    });

    return {
      jointValues: result,
      reachable: result
    };
  }
};
