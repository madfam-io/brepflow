
import { NodeDefinition } from '@brepflow/types';

interface Params {
  cellSize: number;
  wallThickness: number;
  fillDensity: number;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  honeycomb: Shape;
}

export const HoneycombStructureNode: NodeDefinition<HoneycombStructureInputs, HoneycombStructureOutputs, HoneycombStructureParams> = {
  type: 'Specialized::HoneycombStructure',
  category: 'Specialized',
  subcategory: 'Lattice',

  metadata: {
    label: 'HoneycombStructure',
    description: 'Honeycomb infill structure',
    
    
  },

  params: {
        cellSize: {
      "default": 5,
      "min": 0.5,
      "max": 50
    },
    wallThickness: {
      "default": 0.5,
      "min": 0.1,
      "max": 5
    },
    fillDensity: {
      "default": 0.3,
      "min": 0.1,
      "max": 0.9
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        honeycomb: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'honeycombStructure',
      params: {
        shape: inputs.shape,
        cellSize: params.cellSize,
        wallThickness: params.wallThickness,
        fillDensity: params.fillDensity
      }
    });

    return {
      honeycomb: result
    };
  }
};
