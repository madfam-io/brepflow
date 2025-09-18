
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tilesetSize: number;
  gridWidth: number;
  gridHeight: number;
}
interface Inputs {
  tileset: Face[];
}
interface Outputs {
  pattern: Face[];
}

export const WaveFunctionCollapseNode: NodeDefinition<WaveFunctionCollapseInputs, WaveFunctionCollapseOutputs, WaveFunctionCollapseParams> = {
  type: 'Patterns::WaveFunctionCollapse',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'WaveFunctionCollapse',
    description: 'WFC pattern generation',
    
    
  },

  params: {
        tilesetSize: {
      "default": 5,
      "min": 2,
      "max": 20,
      "step": 1
    },
    gridWidth: {
      "default": 20,
      "min": 5,
      "max": 100,
      "step": 1
    },
    gridHeight: {
      "default": 20,
      "min": 5,
      "max": 100,
      "step": 1
    }
  },

  inputs: {
        tileset: 'Face[]'
  },

  outputs: {
        pattern: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'waveFunctionCollapse',
      params: {
        tileset: inputs.tileset,
        tilesetSize: params.tilesetSize,
        gridWidth: params.gridWidth,
        gridHeight: params.gridHeight
      }
    });

    return {
      pattern: result
    };
  }
};
