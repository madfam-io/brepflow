
import { NodeDefinition } from '@brepflow/types';

interface Params {
  conformType: string;
  cellSize: number;
}
interface Inputs {
  targetShape: Shape;
  latticePattern: Shape;
}
interface Outputs {
  conformed: Shape;
}

export const ConformLatticeNode: NodeDefinition<ConformLatticeInputs, ConformLatticeOutputs, ConformLatticeParams> = {
  type: 'Specialized::ConformLattice',
  category: 'Specialized',
  subcategory: 'Lattice',

  metadata: {
    label: 'ConformLattice',
    description: 'Conformal lattice mapping',
    
    
  },

  params: {
        conformType: {
      "default": "volume",
      "options": [
        "surface",
        "volume"
      ]
    },
    cellSize: {
      "default": 10,
      "min": 1,
      "max": 100
    }
  },

  inputs: {
        targetShape: 'Shape',
    latticePattern: 'Shape'
  },

  outputs: {
        conformed: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'conformLattice',
      params: {
        targetShape: inputs.targetShape,
        latticePattern: inputs.latticePattern,
        conformType: params.conformType,
        cellSize: params.cellSize
      }
    });

    return {
      conformed: result
    };
  }
};
