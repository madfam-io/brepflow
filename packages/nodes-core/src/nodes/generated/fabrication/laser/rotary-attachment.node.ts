
import { NodeDefinition } from '@brepflow/types';

interface Params {
  diameter: number;
  stepsPerRotation: number;
}
interface Inputs {
  cylindricalPattern: Wire[];
}
interface Outputs {
  unwrappedPattern: Wire[];
}

export const RotaryAttachmentNode: NodeDefinition<RotaryAttachmentInputs, RotaryAttachmentOutputs, RotaryAttachmentParams> = {
  type: 'Fabrication::RotaryAttachment',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'RotaryAttachment',
    description: 'Setup rotary cutting',
    
    
  },

  params: {
        diameter: {
      "default": 100,
      "min": 10,
      "max": 500
    },
    stepsPerRotation: {
      "default": 10000,
      "min": 100,
      "max": 100000
    }
  },

  inputs: {
        cylindricalPattern: 'Wire[]'
  },

  outputs: {
        unwrappedPattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rotaryAttachment',
      params: {
        cylindricalPattern: inputs.cylindricalPattern,
        diameter: params.diameter,
        stepsPerRotation: params.stepsPerRotation
      }
    });

    return {
      unwrappedPattern: result
    };
  }
};
