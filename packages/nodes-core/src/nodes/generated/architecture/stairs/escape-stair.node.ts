
import { NodeDefinition } from '@brepflow/types';

interface Params {
  enclosure: string;
  width: number;
}
interface Inputs {
  stairwell: Wire;
  floors: Number;
}
interface Outputs {
  escapeStair: Shape;
}

export const EscapeStairNode: NodeDefinition<EscapeStairInputs, EscapeStairOutputs, EscapeStairParams> = {
  type: 'Architecture::EscapeStair',
  category: 'Architecture',
  subcategory: 'Stairs',

  metadata: {
    label: 'EscapeStair',
    description: 'Fire escape staircase',
    
    
  },

  params: {
        enclosure: {
      "default": "enclosed",
      "options": [
        "open",
        "enclosed",
        "pressurized"
      ]
    },
    width: {
      "default": 1200,
      "min": 1100,
      "max": 1500
    }
  },

  inputs: {
        stairwell: 'Wire',
    floors: 'Number'
  },

  outputs: {
        escapeStair: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'escapeStair',
      params: {
        stairwell: inputs.stairwell,
        floors: inputs.floors,
        enclosure: params.enclosure,
        width: params.width
      }
    });

    return {
      escapeStair: result
    };
  }
};
