
import { NodeDefinition } from '@brepflow/types';

interface Params {
  text: string;
  font: string;
  size: number;
  bold: boolean;
  italic: boolean;
  x: number;
  y: number;
}
type Inputs = {};
interface Outputs {
  shape: Shape;
}

export const TextNode: NodeDefinition<TextInputs, TextOutputs, TextParams> = {
  type: 'Sketch::Text',
  category: 'Sketch',
  subcategory: 'Basic',

  metadata: {
    label: 'Text',
    description: 'Create text as geometry',
    
    
  },

  params: {
        text: {
      "default": "Text",
      "description": "Text content"
    },
    font: {
      "default": "Arial",
      "description": "Font family"
    },
    size: {
      "default": 20,
      "min": 1,
      "max": 1000,
      "description": "Font size"
    },
    bold: {
      "default": false
    },
    italic: {
      "default": false
    },
    x: {
      "default": 0,
      "min": -10000,
      "max": 10000
    },
    y: {
      "default": 0,
      "min": -10000,
      "max": 10000
    }
  },

  inputs: {
    
  },

  outputs: {
        shape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeText',
      params: {
        
        text: params.text,
        font: params.font,
        size: params.size,
        bold: params.bold,
        italic: params.italic,
        x: params.x,
        y: params.y
      }
    });

    return {
      shape: result
    };
  }
};
