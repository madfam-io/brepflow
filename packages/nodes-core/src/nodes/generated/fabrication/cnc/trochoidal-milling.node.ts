
import { NodeDefinition } from '@brepflow/types';

interface Params {
  trochoidWidth: number;
  stepover: number;
}
interface Inputs {
  slot: Wire;
}
interface Outputs {
  trochoidalPath: Wire;
}

export const TrochoidalMillingNode: NodeDefinition<TrochoidalMillingInputs, TrochoidalMillingOutputs, TrochoidalMillingParams> = {
  type: 'Fabrication::TrochoidalMilling',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'TrochoidalMilling',
    description: 'Trochoidal milling paths',
    
    
  },

  params: {
        trochoidWidth: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    stepover: {
      "default": 0.3,
      "min": 0.1,
      "max": 1
    }
  },

  inputs: {
        slot: 'Wire'
  },

  outputs: {
        trochoidalPath: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'trochoidalMilling',
      params: {
        slot: inputs.slot,
        trochoidWidth: params.trochoidWidth,
        stepover: params.stepover
      }
    });

    return {
      trochoidalPath: result
    };
  }
};
