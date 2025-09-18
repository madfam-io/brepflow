
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pattern: string;
  layersCount: number;
}
interface Inputs {
  boxSize: Vector;
  palletSize: Vector;
}
interface Outputs {
  placementPoints: Transform[];
}

export const PalletizingPatternNode: NodeDefinition<PalletizingPatternInputs, PalletizingPatternOutputs, PalletizingPatternParams> = {
  type: 'Fabrication::PalletizingPattern',
  category: 'Fabrication',
  subcategory: 'Robotics',

  metadata: {
    label: 'PalletizingPattern',
    description: 'Palletizing patterns',
    
    
  },

  params: {
        pattern: {
      "default": "interlocked",
      "options": [
        "column",
        "interlocked",
        "pinwheel",
        "split-row"
      ]
    },
    layersCount: {
      "default": 10,
      "min": 1,
      "max": 50,
      "step": 1
    }
  },

  inputs: {
        boxSize: 'Vector',
    palletSize: 'Vector'
  },

  outputs: {
        placementPoints: 'Transform[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'palletizingPattern',
      params: {
        boxSize: inputs.boxSize,
        palletSize: inputs.palletSize,
        pattern: params.pattern,
        layersCount: params.layersCount
      }
    });

    return {
      placementPoints: result
    };
  }
};
