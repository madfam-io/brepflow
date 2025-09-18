
import { NodeDefinition } from '@brepflow/types';

interface Params {
  descriptor: string;
  resolution: number;
  normalize: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  descriptor: number[];
  features: Properties;
  similarity: number;
}

export const ShapeDescriptorNode: NodeDefinition<ShapeDescriptorInputs, ShapeDescriptorOutputs, ShapeDescriptorParams> = {
  type: 'Algorithmic::ShapeDescriptor',
  category: 'Algorithmic',
  subcategory: 'Geometry',

  metadata: {
    label: 'ShapeDescriptor',
    description: 'Compute geometric shape descriptors',
    
    
  },

  params: {
        descriptor: {
      "default": "moments",
      "options": [
        "moments",
        "fourier",
        "histogram"
      ]
    },
    resolution: {
      "default": 32,
      "min": 8,
      "max": 128
    },
    normalize: {
      "default": true
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        descriptor: 'number[]',
    features: 'Properties',
    similarity: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'shapeDescriptor',
      params: {
        shape: inputs.shape,
        descriptor: params.descriptor,
        resolution: params.resolution,
        normalize: params.normalize
      }
    });

    return {
      descriptor: result,
      features: result,
      similarity: result
    };
  }
};
