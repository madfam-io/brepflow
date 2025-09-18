
import { NodeDefinition } from '@brepflow/types';

interface Params {
  wrapType: string;
  depth: number;
}
interface Inputs {
  targetSurface: Face;
  sketch: Wire;
  projectionDirection?: Vector;
}
interface Outputs {
  wrappedShape: Shape;
}

export const WrapNode: NodeDefinition<WrapInputs, WrapOutputs, WrapParams> = {
  type: 'Advanced::Wrap',
  category: 'Advanced',
  subcategory: 'Features',

  metadata: {
    label: 'Wrap',
    description: 'Wrap geometry onto surface',
    
    
  },

  params: {
        wrapType: {
      "default": "emboss",
      "options": [
        "scribe",
        "emboss",
        "deboss"
      ]
    },
    depth: {
      "default": 1,
      "min": 0.01,
      "max": 100
    }
  },

  inputs: {
        targetSurface: 'Face',
    sketch: 'Wire',
    projectionDirection: 'Vector'
  },

  outputs: {
        wrappedShape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'wrap',
      params: {
        targetSurface: inputs.targetSurface,
        sketch: inputs.sketch,
        projectionDirection: inputs.projectionDirection,
        wrapType: params.wrapType,
        depth: params.depth
      }
    });

    return {
      wrappedShape: result
    };
  }
};
