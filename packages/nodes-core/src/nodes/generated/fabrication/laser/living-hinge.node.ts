
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pattern: string;
  spacing: number;
  cutLength: number;
}
interface Inputs {
  hingeArea: Face;
}
interface Outputs {
  hingePattern: Wire[];
}

export const LivingHingeNode: NodeDefinition<LivingHingeInputs, LivingHingeOutputs, LivingHingeParams> = {
  type: 'Fabrication::LivingHinge',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'LivingHinge',
    description: 'Generate living hinge pattern',
    
    
  },

  params: {
        pattern: {
      "default": "straight",
      "options": [
        "straight",
        "wave",
        "diamond",
        "honeycomb"
      ]
    },
    spacing: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    cutLength: {
      "default": 10,
      "min": 1,
      "max": 50
    }
  },

  inputs: {
        hingeArea: 'Face'
  },

  outputs: {
        hingePattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'livingHinge',
      params: {
        hingeArea: inputs.hingeArea,
        pattern: params.pattern,
        spacing: params.spacing,
        cutLength: params.cutLength
      }
    });

    return {
      hingePattern: result
    };
  }
};
