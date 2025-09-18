
import { NodeDefinition } from '@brepflow/types';

interface Params {
  packingType: string;
}
interface Inputs {
  container: Shape;
  radius: number;
}
interface Outputs {
  centers: Point[];
  spheres: Shape[];
}

export const SpherePackingNode: NodeDefinition<SpherePackingInputs, SpherePackingOutputs, SpherePackingParams> = {
  type: 'Patterns::SpherePacking',
  category: 'Patterns',
  subcategory: 'Packing',

  metadata: {
    label: 'SpherePacking',
    description: '3D sphere packing',
    
    
  },

  params: {
        packingType: {
      "default": "hexagonal",
      "options": [
        "cubic",
        "hexagonal",
        "random",
        "optimal"
      ]
    }
  },

  inputs: {
        container: 'Shape',
    radius: 'number'
  },

  outputs: {
        centers: 'Point[]',
    spheres: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'spherePacking',
      params: {
        container: inputs.container,
        radius: inputs.radius,
        packingType: params.packingType
      }
    });

    return {
      centers: result,
      spheres: result
    };
  }
};
