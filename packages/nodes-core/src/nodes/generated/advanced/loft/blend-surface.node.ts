
import { NodeDefinition } from '@brepflow/types';

interface Params {
  continuity: string;
  blendFactor: number;
}
interface Inputs {
  surface1: Face;
  surface2: Face;
  edge1?: Edge;
  edge2?: Edge;
}
interface Outputs {
  blendSurface: Shape;
}

export const BlendSurfaceNode: NodeDefinition<BlendSurfaceInputs, BlendSurfaceOutputs, BlendSurfaceParams> = {
  type: 'Advanced::BlendSurface',
  category: 'Advanced',
  subcategory: 'Loft',

  metadata: {
    label: 'BlendSurface',
    description: 'Blend between surfaces',
    
    
  },

  params: {
        continuity: {
      "default": "G1",
      "options": [
        "G0",
        "G1",
        "G2"
      ]
    },
    blendFactor: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        surface1: 'Face',
    surface2: 'Face',
    edge1: 'Edge',
    edge2: 'Edge'
  },

  outputs: {
        blendSurface: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'blendSurface',
      params: {
        surface1: inputs.surface1,
        surface2: inputs.surface2,
        edge1: inputs.edge1,
        edge2: inputs.edge2,
        continuity: params.continuity,
        blendFactor: params.blendFactor
      }
    });

    return {
      blendSurface: result
    };
  }
};
