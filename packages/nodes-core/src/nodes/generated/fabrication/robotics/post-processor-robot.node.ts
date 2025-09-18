
import { NodeDefinition } from '@brepflow/types';

interface Params {
  robotBrand: string;
}
interface Inputs {
  trajectory: Transform[];
}
interface Outputs {
  robotCode: Data;
}

export const PostProcessorRobotNode: NodeDefinition<PostProcessorRobotInputs, PostProcessorRobotOutputs, PostProcessorRobotParams> = {
  type: 'Fabrication::PostProcessorRobot',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'PostProcessorRobot',
    description: 'Robot code generation',
    
    
  },

  params: {
        robotBrand: {
      "default": "abb",
      "options": [
        "abb",
        "kuka",
        "fanuc",
        "yaskawa",
        "ur"
      ]
    }
  },

  inputs: {
        trajectory: 'Transform[]'
  },

  outputs: {
        robotCode: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'postProcessorRobot',
      params: {
        trajectory: inputs.trajectory,
        robotBrand: params.robotBrand
      }
    });

    return {
      robotCode: result
    };
  }
};
