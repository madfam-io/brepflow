
import { NodeDefinition } from '@brepflow/types';

interface Params {
  offset: number;
  roundCorners: boolean;
}
interface Inputs {
  cells: Wire[];
}
interface Outputs {
  offsetCells: Wire[];
}

export const VoronoiOffsetNode: NodeDefinition<VoronoiOffsetInputs, VoronoiOffsetOutputs, VoronoiOffsetParams> = {
  type: 'Patterns::VoronoiOffset',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'VoronoiOffset',
    description: 'Offset Voronoi cells',
    
    
  },

  params: {
        offset: {
      "default": 1,
      "min": -10,
      "max": 10
    },
    roundCorners: {
      "default": false
    }
  },

  inputs: {
        cells: 'Wire[]'
  },

  outputs: {
        offsetCells: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiOffset',
      params: {
        cells: inputs.cells,
        offset: params.offset,
        roundCorners: params.roundCorners
      }
    });

    return {
      offsetCells: result
    };
  }
};
