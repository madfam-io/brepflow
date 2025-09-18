
import { NodeDefinition } from '@brepflow/types';

interface Params {
  majorRadius: number;
  pitch: number;
  height: number;
  threadAngle: number;
  internal: boolean;
}
type Inputs = {};
interface Outputs {
  thread: Solid;
}

export const ThreadNode: NodeDefinition<ThreadInputs, ThreadOutputs, ThreadParams> = {
  type: 'Solid::Thread',
  category: 'Solid',
  subcategory: 'Helical',

  metadata: {
    label: 'Thread',
    description: 'Create threaded geometry',
    
    
  },

  params: {
        majorRadius: {
      "default": 50,
      "min": 0.1,
      "max": 10000
    },
    pitch: {
      "default": 5,
      "min": 0.1,
      "max": 100
    },
    height: {
      "default": 100,
      "min": 0.1,
      "max": 10000
    },
    threadAngle: {
      "default": 60,
      "min": 30,
      "max": 90
    },
    internal: {
      "default": false
    }
  },

  inputs: {
    
  },

  outputs: {
        thread: 'Solid'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeThread',
      params: {
        
        majorRadius: params.majorRadius,
        pitch: params.pitch,
        height: params.height,
        threadAngle: params.threadAngle,
        internal: params.internal
      }
    });

    return {
      thread: result
    };
  }
};
