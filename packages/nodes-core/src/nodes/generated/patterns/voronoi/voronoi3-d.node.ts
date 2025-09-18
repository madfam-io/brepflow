
import { NodeDefinition } from '@brepflow/types';

interface Params {
  clipToBox: boolean;
}
interface Inputs {
  points: Point[];
  bounds?: Box;
}
interface Outputs {
  cells: Shape[];
  faces: Face[];
}

export const Voronoi3DNode: NodeDefinition<Voronoi3DInputs, Voronoi3DOutputs, Voronoi3DParams> = {
  type: 'Patterns::Voronoi3D',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'Voronoi3D',
    description: 'Create 3D Voronoi cells',
    
    
  },

  params: {
        clipToBox: {
      "default": true
    }
  },

  inputs: {
        points: 'Point[]',
    bounds: 'Box'
  },

  outputs: {
        cells: 'Shape[]',
    faces: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoi3D',
      params: {
        points: inputs.points,
        bounds: inputs.bounds,
        clipToBox: params.clipToBox
      }
    });

    return {
      cells: result,
      faces: result
    };
  }
};
