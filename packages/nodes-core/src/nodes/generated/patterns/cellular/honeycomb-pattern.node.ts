
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cellSize: number;
  wallThickness: number;
}
interface Inputs {
  boundary: Wire;
}
interface Outputs {
  honeycomb: Wire[];
}

export const HoneycombPatternNode: NodeDefinition<HoneycombPatternInputs, HoneycombPatternOutputs, HoneycombPatternParams> = {
  type: 'Patterns::HoneycombPattern',
  category: 'Patterns',
  subcategory: 'Cellular',

  metadata: {
    label: 'HoneycombPattern',
    description: 'Honeycomb hexagonal pattern',
    
    
  },

  params: {
        cellSize: {
      "default": 10,
      "min": 1
    },
    wallThickness: {
      "default": 1,
      "min": 0.1
    }
  },

  inputs: {
        boundary: 'Wire'
  },

  outputs: {
        honeycomb: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'honeycombPattern',
      params: {
        boundary: inputs.boundary,
        cellSize: params.cellSize,
        wallThickness: params.wallThickness
      }
    });

    return {
      honeycomb: result
    };
  }
};
