
import { NodeDefinition } from '@brepflow/types';

interface Params {
  pattern: string;
  stepdown: number;
  finishPass: boolean;
}
interface Inputs {
  pocket: Wire;
  depth: Number;
}
interface Outputs {
  roughing: Wire[];
  finishing: Wire[];
}

export const PocketingStrategyNode: NodeDefinition<PocketingStrategyInputs, PocketingStrategyOutputs, PocketingStrategyParams> = {
  type: 'Fabrication::PocketingStrategy',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'PocketingStrategy',
    description: 'Pocket machining strategy',
    
    
  },

  params: {
        pattern: {
      "default": "spiral",
      "options": [
        "spiral",
        "zigzag",
        "contour",
        "trochoidal"
      ]
    },
    stepdown: {
      "default": 2,
      "min": 0.1,
      "max": 10
    },
    finishPass: {
      "default": true
    }
  },

  inputs: {
        pocket: 'Wire',
    depth: 'Number'
  },

  outputs: {
        roughing: 'Wire[]',
    finishing: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'pocketingStrategy',
      params: {
        pocket: inputs.pocket,
        depth: inputs.depth,
        pattern: params.pattern,
        stepdown: params.stepdown,
        finishPass: params.finishPass
      }
    });

    return {
      roughing: result,
      finishing: result
    };
  }
};
