
import { NodeDefinition } from '@brepflow/types';

interface Params {
  passes: number;
  powerRamp: boolean;
  zStep: number;
}
interface Inputs {
  paths: Wire[];
}
interface Outputs {
  multipassPaths: Wire[][];
}

export const MultiplePassesNode: NodeDefinition<MultiplePassesInputs, MultiplePassesOutputs, MultiplePassesParams> = {
  type: 'Fabrication::MultiplePasses',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'MultiplePasses',
    description: 'Setup multiple passes',
    
    
  },

  params: {
        passes: {
      "default": 2,
      "min": 1,
      "max": 10,
      "step": 1
    },
    powerRamp: {
      "default": false
    },
    zStep: {
      "default": 0,
      "min": 0,
      "max": 5
    }
  },

  inputs: {
        paths: 'Wire[]'
  },

  outputs: {
        multipassPaths: 'Wire[][]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'multiplePasses',
      params: {
        paths: inputs.paths,
        passes: params.passes,
        powerRamp: params.powerRamp,
        zStep: params.zStep
      }
    });

    return {
      multipassPaths: result
    };
  }
};
