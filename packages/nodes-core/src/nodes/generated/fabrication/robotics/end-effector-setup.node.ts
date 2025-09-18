
import { NodeDefinition } from '@brepflow/types';

interface Params {
  toolType: string;
  tcpOffset: [number, number, number];
}
interface Inputs {
  toolGeometry?: Shape;
}
interface Outputs {
  toolConfiguration: Data;
}

export const EndEffectorSetupNode: NodeDefinition<EndEffectorSetupInputs, EndEffectorSetupOutputs, EndEffectorSetupParams> = {
  type: 'Fabrication::EndEffectorSetup',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'EndEffectorSetup',
    description: 'Configure end effector',
    
    
  },

  params: {
        toolType: {
      "default": "gripper",
      "options": [
        "gripper",
        "welder",
        "extruder",
        "mill",
        "laser"
      ]
    },
    tcpOffset: {
      "default": "[0, 0, 100]"
    }
  },

  inputs: {
        toolGeometry: 'Shape'
  },

  outputs: {
        toolConfiguration: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'endEffectorSetup',
      params: {
        toolGeometry: inputs.toolGeometry,
        toolType: params.toolType,
        tcpOffset: params.tcpOffset
      }
    });

    return {
      toolConfiguration: result
    };
  }
};
