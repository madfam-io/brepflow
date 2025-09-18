
import { NodeDefinition } from '@brepflow/types';

interface Params {
  timeStep: number;
  dynamics: boolean;
}
interface Inputs {
  program: Data;
}
interface Outputs {
  simulation: Data;
  cycleTime: Number;
}

export const RobotSimulationNode: NodeDefinition<RobotSimulationInputs, RobotSimulationOutputs, RobotSimulationParams> = {
  type: 'Fabrication::RobotSimulation',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'RobotSimulation',
    description: 'Simulate robot motion',
    
    
  },

  params: {
        timeStep: {
      "default": 0.01,
      "min": 0.001,
      "max": 0.1
    },
    dynamics: {
      "default": false
    }
  },

  inputs: {
        program: 'Data'
  },

  outputs: {
        simulation: 'Data',
    cycleTime: 'Number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'robotSimulation',
      params: {
        program: inputs.program,
        timeStep: params.timeStep,
        dynamics: params.dynamics
      }
    });

    return {
      simulation: result,
      cycleTime: result
    };
  }
};
