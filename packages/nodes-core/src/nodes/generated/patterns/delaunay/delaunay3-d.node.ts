
import { NodeDefinition } from '@brepflow/types';

type Params = {};
interface Inputs {
  points: Point[];
}
interface Outputs {
  tetrahedra: Shape[];
  mesh: Mesh;
}

export const Delaunay3DNode: NodeDefinition<Delaunay3DInputs, Delaunay3DOutputs, Delaunay3DParams> = {
  type: 'Patterns::Delaunay3D',
  category: 'Patterns',
  subcategory: 'Delaunay',

  metadata: {
    label: 'Delaunay3D',
    description: 'Create 3D Delaunay tetrahedralization',
    
    
  },

  params: {
    
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        tetrahedra: 'Shape[]',
    mesh: 'Mesh'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'delaunay3D',
      params: {
        points: inputs.points
        
      }
    });

    return {
      tetrahedra: result,
      mesh: result
    };
  }
};
