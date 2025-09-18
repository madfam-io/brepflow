
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strength: number;
  radius: number;
  weightByArea: boolean;
}
interface Inputs {
  mesh: Mesh;
}
interface Outputs {
  field: ScalarField;
}

export const MeshAttractorNode: NodeDefinition<MeshAttractorInputs, MeshAttractorOutputs, MeshAttractorParams> = {
  type: 'Field::MeshAttractor',
  category: 'Field',
  subcategory: 'Attractor',

  metadata: {
    label: 'MeshAttractor',
    description: 'Mesh vertex attractor',
    
    
  },

  params: {
        strength: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    radius: {
      "default": 20,
      "min": 0.1
    },
    weightByArea: {
      "default": false
    }
  },

  inputs: {
        mesh: 'Mesh'
  },

  outputs: {
        field: 'ScalarField'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'attractorMesh',
      params: {
        mesh: inputs.mesh,
        strength: params.strength,
        radius: params.radius,
        weightByArea: params.weightByArea
      }
    });

    return {
      field: result
    };
  }
};
