
import { NodeDefinition } from '@brepflow/types';

interface Params {
  font: string;
  height: number;
}
interface Inputs {
  text: Data;
  position: Point;
}
interface Outputs {
  textPaths: Wire[];
}

export const TextEngravingNode: NodeDefinition<TextEngravingInputs, TextEngravingOutputs, TextEngravingParams> = {
  type: 'Fabrication::TextEngraving',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'TextEngraving',
    description: 'Optimize text for engraving',
    
    
  },

  params: {
        font: {
      "default": "single-line",
      "options": [
        "single-line",
        "outline",
        "filled"
      ]
    },
    height: {
      "default": 10,
      "min": 1,
      "max": 100
    }
  },

  inputs: {
        text: 'Data',
    position: 'Point'
  },

  outputs: {
        textPaths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'textEngraving',
      params: {
        text: inputs.text,
        position: inputs.position,
        font: params.font,
        height: params.height
      }
    });

    return {
      textPaths: result
    };
  }
};
