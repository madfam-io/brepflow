
import { NodeDefinition } from '@brepflow/types';

interface Params {
  threadPitch: number;
  threadDepth: number;
  passes: number;
}
interface Inputs {
  holes: Wire[];
}
interface Outputs {
  threadPaths: Wire[];
}

export const ThreadMillingNode: NodeDefinition<ThreadMillingInputs, ThreadMillingOutputs, ThreadMillingParams> = {
  type: 'Fabrication::ThreadMilling',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'ThreadMilling',
    description: 'Thread milling operation',
    
    
  },

  params: {
        threadPitch: {
      "default": 1.5,
      "min": 0.1,
      "max": 10
    },
    threadDepth: {
      "default": 1,
      "min": 0.1,
      "max": 5
    },
    passes: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        holes: 'Wire[]'
  },

  outputs: {
        threadPaths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'threadMilling',
      params: {
        holes: inputs.holes,
        threadPitch: params.threadPitch,
        threadDepth: params.threadDepth,
        passes: params.passes
      }
    });

    return {
      threadPaths: result
    };
  }
};
