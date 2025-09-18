
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tileType: string;
  randomSeed: number;
}
interface Inputs {
  grid: Face[];
}
interface Outputs {
  pattern: Wire[];
}

export const TruchetTilesNode: NodeDefinition<TruchetTilesInputs, TruchetTilesOutputs, TruchetTilesParams> = {
  type: 'Patterns::TruchetTiles',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'TruchetTiles',
    description: 'Truchet tile pattern',
    
    
  },

  params: {
        tileType: {
      "default": "arc",
      "options": [
        "arc",
        "diagonal",
        "smith",
        "multi"
      ]
    },
    randomSeed: {
      "default": 0,
      "min": 0,
      "max": 999999
    }
  },

  inputs: {
        grid: 'Face[]'
  },

  outputs: {
        pattern: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'truchetTiles',
      params: {
        grid: inputs.grid,
        tileType: params.tileType,
        randomSeed: params.randomSeed
      }
    });

    return {
      pattern: result
    };
  }
};
