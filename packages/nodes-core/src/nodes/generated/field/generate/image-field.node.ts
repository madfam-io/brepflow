
import { NodeDefinition } from '@brepflow/types';

interface Params {
  channel: string;
  scale: any;
  height: number;
}
interface Inputs {
  image: Data;
}
interface Outputs {
  field: ScalarField;
}

export const ImageFieldNode: NodeDefinition<ImageFieldInputs, ImageFieldOutputs, ImageFieldParams> = {
  type: 'Field::ImageField',
  category: 'Field',
  subcategory: 'Generate',

  metadata: {
    label: 'ImageField',
    description: 'Field from image',
    
    
  },

  params: {
        channel: {
      "default": "luminance",
      "options": [
        "red",
        "green",
        "blue",
        "alpha",
        "luminance"
      ]
    },
    scale: {
      "default": [
        100,
        100
      ]
    },
    height: {
      "default": 10,
      "min": 0
    }
  },

  inputs: {
        image: 'Data'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fieldImage',
      params: {
        image: inputs.image,
        channel: params.channel,
        scale: params.scale,
        height: params.height
      }
    });

    return {
      field: result
    };
  }
};
