
import { NodeDefinition } from '@brepflow/types';

interface Params {
  text: string;
  font: string;
  size: number;
  height: number;
  bold: boolean;
  italic: boolean;
}
interface Inputs {
  position?: Point;
  direction?: Vector;
}
interface Outputs {
  text: Shape;
}

export const Text3DNode: NodeDefinition<Text3DInputs, Text3DOutputs, Text3DParams> = {
  type: 'Specialized::Text3D',
  category: 'Specialized',
  subcategory: 'Text',

  metadata: {
    label: 'Text3D',
    description: 'Create 3D text',
    
    
  },

  params: {
        text: {
      "default": "HELLO"
    },
    font: {
      "default": "Arial",
      "options": [
        "Arial",
        "Helvetica",
        "Times",
        "Courier"
      ]
    },
    size: {
      "default": 20,
      "min": 1,
      "max": 1000
    },
    height: {
      "default": 5,
      "min": 0.1,
      "max": 1000
    },
    bold: {
      "default": false
    },
    italic: {
      "default": false
    }
  },

  inputs: {
        position: 'Point',
    direction: 'Vector'
  },

  outputs: {
        text: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'text3D',
      params: {
        position: inputs.position,
        direction: inputs.direction,
        text: params.text,
        font: params.font,
        size: params.size,
        height: params.height,
        bold: params.bold,
        italic: params.italic
      }
    });

    return {
      text: result
    };
  }
};
