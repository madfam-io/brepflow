
import { NodeDefinition } from '@brepflow/types';

interface Params {
  level: string;
  accessControl: string;
}
interface Inputs {
  opening: Wire;
}
interface Outputs {
  securityDoor: Shape;
}

export const SecurityDoorNode: NodeDefinition<SecurityDoorInputs, SecurityDoorOutputs, SecurityDoorParams> = {
  type: 'Architecture::SecurityDoor',
  category: 'Architecture',
  subcategory: 'Doors',

  metadata: {
    label: 'SecurityDoor',
    description: 'Security door system',
    
    
  },

  params: {
        level: {
      "default": "high",
      "options": [
        "standard",
        "high",
        "maximum"
      ]
    },
    accessControl: {
      "default": "card",
      "options": [
        "key",
        "code",
        "card",
        "biometric"
      ]
    }
  },

  inputs: {
        opening: 'Wire'
  },

  outputs: {
        securityDoor: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'securityDoor',
      params: {
        opening: inputs.opening,
        level: params.level,
        accessControl: params.accessControl
      }
    });

    return {
      securityDoor: result
    };
  }
};
