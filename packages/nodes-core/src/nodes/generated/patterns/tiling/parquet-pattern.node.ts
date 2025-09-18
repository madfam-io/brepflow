
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pattern: string;
  plankLength: number;
  plankWidth: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  planks: Face[];
}

export const ParquetPatternNode: NodeDefinition<ParquetPatternInputs, ParquetPatternOutputs, ParquetPatternParams> = {
  type: 'Patterns::ParquetPattern',
  category: 'Patterns',
  subcategory: 'Tiling',

  metadata: {
    label: 'ParquetPattern',
    description: 'Wood parquet patterns',
    
    
  },

  params: {
        pattern: {
      "default": "herringbone",
      "options": [
        "herringbone",
        "chevron",
        "basket",
        "versailles",
        "chantilly"
      ]
    },
    plankLength: {
      "default": 30,
      "min": 1
    },
    plankWidth: {
      "default": 5,
      "min": 1
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        planks: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'parquetPattern',
      params: {
        surface: inputs.surface,
        pattern: params.pattern,
        plankLength: params.plankLength,
        plankWidth: params.plankWidth
      }
    });

    return {
      planks: result
    };
  }
};
