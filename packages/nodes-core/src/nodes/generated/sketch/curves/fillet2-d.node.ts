
import { NodeDefinition } from '@brepflow/types';

interface Params {
  radius: number;
  allCorners: boolean;
}
interface Inputs {
  wire: Wire;
  vertices?: Vertex[];
}
interface Outputs {
  filleted: Wire;
}

export const Fillet2DNode: NodeDefinition<Fillet2DInputs, Fillet2DOutputs, Fillet2DParams> = {
  type: 'Sketch::Fillet2D',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Fillet2D',
    description: 'Fillet corners of a 2D shape',
    
    
  },

  params: {
        radius: {
      "default": 5,
      "min": 0.1,
      "max": 1000
    },
    allCorners: {
      "default": true
    }
  },

  inputs: {
        wire: 'Wire',
    vertices: 'Vertex[]'
  },

  outputs: {
        filleted: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'fillet2D',
      params: {
        wire: inputs.wire,
        vertices: inputs.vertices,
        radius: params.radius,
        allCorners: params.allCorners
      }
    });

    return {
      filleted: result
    };
  }
};
