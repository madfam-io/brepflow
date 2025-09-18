
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cellSize: number;
  strutDiameter: number;
}
interface Inputs {
  bounds: Box;
}
interface Outputs {
  lattice: Wire[];
}

export const DiamondLatticeNode: NodeDefinition<DiamondLatticeInputs, DiamondLatticeOutputs, DiamondLatticeParams> = {
  type: 'Patterns::DiamondLattice',
  category: 'Patterns',
  subcategory: 'Lattice',

  metadata: {
    label: 'DiamondLattice',
    description: 'Diamond lattice structure',
    
    
  },

  params: {
        cellSize: {
      "default": 10,
      "min": 1
    },
    strutDiameter: {
      "default": 1,
      "min": 0.1
    }
  },

  inputs: {
        bounds: 'Box'
  },

  outputs: {
        lattice: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'diamondLattice',
      params: {
        bounds: inputs.bounds,
        cellSize: params.cellSize,
        strutDiameter: params.strutDiameter
      }
    });

    return {
      lattice: result
    };
  }
};
