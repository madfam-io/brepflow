
import { NodeDefinition } from '@brepflow/types';

interface Params {
  extensionLength: number;
  extensionType: string;
}
interface Inputs {
  surface: Face;
  edges: Edge[];
}
interface Outputs {
  extendedSurface: Face;
}

export const ExtendSurfaceNode: NodeDefinition<ExtendSurfaceInputs, ExtendSurfaceOutputs, ExtendSurfaceParams> = {
  type: 'Advanced::ExtendSurface',
  category: 'Advanced',
  subcategory: 'Surface',

  metadata: {
    label: 'ExtendSurface',
    description: 'Extend surface edges',
    
    
  },

  params: {
        extensionLength: {
      "default": 10,
      "min": 0.1,
      "max": 1000
    },
    extensionType: {
      "default": "natural",
      "options": [
        "linear",
        "natural",
        "reflective"
      ]
    }
  },

  inputs: {
        surface: 'Face',
    edges: 'Edge[]'
  },

  outputs: {
        extendedSurface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'extendSurface',
      params: {
        surface: inputs.surface,
        edges: inputs.edges,
        extensionLength: params.extensionLength,
        extensionType: params.extensionType
      }
    });

    return {
      extendedSurface: result
    };
  }
};
