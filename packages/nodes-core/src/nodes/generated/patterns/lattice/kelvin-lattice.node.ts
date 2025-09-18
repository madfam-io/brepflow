
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cellSize: number;
  wallThickness: number;
}
interface Inputs {
  bounds: Box;
}
interface Outputs {
  foam: Face[];
}

export const KelvinLatticeNode: NodeDefinition<KelvinLatticeInputs, KelvinLatticeOutputs, KelvinLatticeParams> = {
  type: 'Patterns::KelvinLattice',
  category: 'Patterns',
  subcategory: 'Lattice',

  metadata: {
    label: 'KelvinLattice',
    description: 'Kelvin foam structure',
    
    
  },

  params: {
        cellSize: {
      "default": 10,
      "min": 1
    },
    wallThickness: {
      "default": 0.5,
      "min": 0.1
    }
  },

  inputs: {
        bounds: 'Box'
  },

  outputs: {
        foam: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'kelvinLattice',
      params: {
        bounds: inputs.bounds,
        cellSize: params.cellSize,
        wallThickness: params.wallThickness
      }
    });

    return {
      foam: result
    };
  }
};
