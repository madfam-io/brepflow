
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  createSolid: boolean;
}
interface Inputs {
  surfaces: Face[];
}
interface Outputs {
  knittedShape: Shape;
}

export const KnitSurfacesNode: NodeDefinition<KnitSurfacesInputs, KnitSurfacesOutputs, KnitSurfacesParams> = {
  type: 'Advanced::KnitSurfaces',
  category: 'Advanced',
  subcategory: 'Surface',

  metadata: {
    label: 'KnitSurfaces',
    description: 'Knit surfaces together',
    
    
  },

  params: {
        tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    },
    createSolid: {
      "default": false
    }
  },

  inputs: {
        surfaces: 'Face[]'
  },

  outputs: {
        knittedShape: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'knitSurfaces',
      params: {
        surfaces: inputs.surfaces,
        tolerance: params.tolerance,
        createSolid: params.createSolid
      }
    });

    return {
      knittedShape: result
    };
  }
};
