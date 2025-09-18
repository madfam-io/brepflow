
import { NodeDefinition } from '@brepflow/types';

interface Params {
  distance: number;
}
interface Inputs {
  wire: Wire;
  vertices?: Vertex[];
}
interface Outputs {
  chamfered: Wire;
}

export const Chamfer2DNode: NodeDefinition<Chamfer2DInputs, Chamfer2DOutputs, Chamfer2DParams> = {
  type: 'Sketch::Chamfer2D',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Chamfer2D',
    description: 'Chamfer corners of a 2D shape',
    
    
  },

  params: {
        distance: {
      "default": 5,
      "min": 0.1,
      "max": 1000
    }
  },

  inputs: {
        wire: 'Wire',
    vertices: 'Vertex[]'
  },

  outputs: {
        chamfered: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'chamfer2D',
      params: {
        wire: inputs.wire,
        vertices: inputs.vertices,
        distance: params.distance
      }
    });

    return {
      chamfered: result
    };
  }
};
