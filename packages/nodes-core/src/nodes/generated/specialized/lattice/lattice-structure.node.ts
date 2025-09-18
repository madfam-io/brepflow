
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cellType: string;
  cellSize: number;
  strutDiameter: number;
  porosity: number;
}
interface Inputs {
  boundingShape: Shape;
}
interface Outputs {
  lattice: Shape;
}

export const LatticeStructureNode: NodeDefinition<LatticeStructureInputs, LatticeStructureOutputs, LatticeStructureParams> = {
  type: 'Specialized::LatticeStructure',
  category: 'Specialized',
  subcategory: 'Lattice',

  metadata: {
    label: 'LatticeStructure',
    description: 'Create lattice structure',
    
    
  },

  params: {
        cellType: {
      "default": "cubic",
      "options": [
        "cubic",
        "gyroid",
        "diamond",
        "schwarz",
        "bcc",
        "fcc"
      ]
    },
    cellSize: {
      "default": 10,
      "min": 0.1,
      "max": 100
    },
    strutDiameter: {
      "default": 1,
      "min": 0.1,
      "max": 10
    },
    porosity: {
      "default": 0.7,
      "min": 0.1,
      "max": 0.95
    }
  },

  inputs: {
        boundingShape: 'Shape'
  },

  outputs: {
        lattice: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'latticeStructure',
      params: {
        boundingShape: inputs.boundingShape,
        cellType: params.cellType,
        cellSize: params.cellSize,
        strutDiameter: params.strutDiameter,
        porosity: params.porosity
      }
    });

    return {
      lattice: result
    };
  }
};
