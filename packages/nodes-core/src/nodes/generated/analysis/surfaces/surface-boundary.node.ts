
import { NodeDefinition } from '@brepflow/types';

interface Params {
  includeHoles: boolean;
  simplify: boolean;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  outerBoundary: Wire;
  innerBoundaries: Wire[];
  allBoundaries: Wire[];
}

export const SurfaceBoundaryNode: NodeDefinition<SurfaceBoundaryInputs, SurfaceBoundaryOutputs, SurfaceBoundaryParams> = {
  type: 'Analysis::SurfaceBoundary',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceBoundary',
    description: 'Extract surface boundary curves',
    
    
  },

  params: {
        includeHoles: {
      "default": true
    },
    simplify: {
      "default": false
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        outerBoundary: 'Wire',
    innerBoundaries: 'Wire[]',
    allBoundaries: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceBoundary',
      params: {
        surface: inputs.surface,
        includeHoles: params.includeHoles,
        simplify: params.simplify
      }
    });

    return {
      outerBoundary: result,
      innerBoundaries: result,
      allBoundaries: result
    };
  }
};
