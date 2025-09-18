
import { NodeDefinition } from '@brepflow/types';

interface Params {
  forceLimit: number;
  compliance: number;
}
interface Inputs {
  contactSurface: Face;
}
interface Outputs {
  forceProfile: Data;
}

export const ForceControlNode: NodeDefinition<ForceControlInputs, ForceControlOutputs, ForceControlParams> = {
  type: 'Fabrication::ForceControl',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'ForceControl',
    description: 'Force/torque control',
    
    
  },

  params: {
        forceLimit: {
      "default": 100,
      "min": 1,
      "max": 1000
    },
    compliance: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        contactSurface: 'Face'
  },

  outputs: {
        forceProfile: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'forceControl',
      params: {
        contactSurface: inputs.contactSurface,
        forceLimit: params.forceLimit,
        compliance: params.compliance
      }
    });

    return {
      forceProfile: result
    };
  }
};
