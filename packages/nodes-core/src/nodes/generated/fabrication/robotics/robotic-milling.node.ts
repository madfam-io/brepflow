
import { NodeDefinition } from '@brepflow/types';

interface Params {
  spindleSpeed: number;
  feedRate: number;
}
interface Inputs {
  millingPaths: Wire[];
  toolOrientation?: Vector;
}
interface Outputs {
  robotProgram: Data;
}

export const RoboticMillingNode: NodeDefinition<RoboticMillingInputs, RoboticMillingOutputs, RoboticMillingParams> = {
  type: 'Fabrication::RoboticMilling',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'RoboticMilling',
    description: 'Robotic milling paths',
    
    
  },

  params: {
        spindleSpeed: {
      "default": 10000,
      "min": 1000,
      "max": 30000
    },
    feedRate: {
      "default": 1000,
      "min": 10,
      "max": 5000
    }
  },

  inputs: {
        millingPaths: 'Wire[]',
    toolOrientation: 'Vector'
  },

  outputs: {
        robotProgram: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'roboticMilling',
      params: {
        millingPaths: inputs.millingPaths,
        toolOrientation: inputs.toolOrientation,
        spindleSpeed: params.spindleSpeed,
        feedRate: params.feedRate
      }
    });

    return {
      robotProgram: result
    };
  }
};
