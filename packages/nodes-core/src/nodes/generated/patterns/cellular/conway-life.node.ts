
import { NodeDefinition } from '@brepflow/types';

interface Params {
  generations: number;
  cellSize: number;
}
interface Inputs {
  initialCells: Point[];
}
interface Outputs {
  liveCells: Face[];
}

export const ConwayLifeNode: NodeDefinition<ConwayLifeInputs, ConwayLifeOutputs, ConwayLifeParams> = {
  type: 'Patterns::ConwayLife',
  category: 'Patterns',
  subcategory: 'Cellular',

  metadata: {
    label: 'ConwayLife',
    description: 'Conway Game of Life',
    
    
  },

  params: {
        generations: {
      "default": 10,
      "min": 1,
      "max": 100,
      "step": 1
    },
    cellSize: {
      "default": 1,
      "min": 0.1
    }
  },

  inputs: {
        initialCells: 'Point[]'
  },

  outputs: {
        liveCells: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'conwayLife',
      params: {
        initialCells: inputs.initialCells,
        generations: params.generations,
        cellSize: params.cellSize
      }
    });

    return {
      liveCells: result
    };
  }
};
