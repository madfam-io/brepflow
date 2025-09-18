
import { NodeDefinition } from '@brepflow/types';

interface Params {
  rule: number;
  generations: number;
  cellSize: number;
}
interface Inputs {
  initialState: Point[];
}
interface Outputs {
  cells: Face[];
}

export const CellularAutomataNode: NodeDefinition<CellularAutomataInputs, CellularAutomataOutputs, CellularAutomataParams> = {
  type: 'Patterns::CellularAutomata',
  category: 'Patterns',
  subcategory: 'Cellular',

  metadata: {
    label: 'CellularAutomata',
    description: 'Cellular automaton pattern',
    
    
  },

  params: {
        rule: {
      "default": 30,
      "min": 0,
      "max": 255
    },
    generations: {
      "default": 50,
      "min": 1,
      "max": 200,
      "step": 1
    },
    cellSize: {
      "default": 1,
      "min": 0.1
    }
  },

  inputs: {
        initialState: 'Point[]'
  },

  outputs: {
        cells: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'cellularAutomata',
      params: {
        initialState: inputs.initialState,
        rule: params.rule,
        generations: params.generations,
        cellSize: params.cellSize
      }
    });

    return {
      cells: result
    };
  }
};
