
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  size: number;
}
type Inputs = {};
interface Outputs {
  solid: Solid;
}

export const PolyhedronNode: NodeDefinition<PolyhedronInputs, PolyhedronOutputs, PolyhedronParams> = {
  type: 'Solid::Polyhedron',
  category: 'Solid',
  subcategory: 'Primitives',

  metadata: {
    label: 'Polyhedron',
    description: 'Create a regular polyhedron',
    
    
  },

  params: {
        type: {
      "default": "octahedron",
      "options": [
        "tetrahedron",
        "octahedron",
        "dodecahedron",
        "icosahedron"
      ]
    },
    size: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    }
  },

  inputs: {
    
  },

  outputs: {
        solid: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makePolyhedron',
      params: {
        
        type: params.type,
        size: params.size
      }
    });

    return {
      solid: result
    };
  }
};
