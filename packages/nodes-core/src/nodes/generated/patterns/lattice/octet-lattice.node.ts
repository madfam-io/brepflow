
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

export const OctetLatticeNode: NodeDefinition<OctetLatticeInputs, OctetLatticeOutputs, OctetLatticeParams> = {
  type: 'Patterns::OctetLattice',
  category: 'Patterns',
  subcategory: 'Lattice',

  metadata: {
    label: 'OctetLattice',
    description: 'Octet truss lattice',
    
    
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
      type: 'octetLattice',
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
