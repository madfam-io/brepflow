
import { NodeDefinition } from '@brepflow/types';

interface Params {
  panelWidth: number;
  trackType: string;
}
interface Inputs {
  path: Wire;
}
interface Outputs {
  partition: Shape[];
  track: Wire;
}

export const MovablePartitionNode: NodeDefinition<MovablePartitionInputs, MovablePartitionOutputs, MovablePartitionParams> = {
  type: 'Architecture::MovablePartition',
  category: 'Architecture',
  subcategory: 'Walls',

  metadata: {
    label: 'MovablePartition',
    description: 'Movable partition system',
    
    
  },

  params: {
        panelWidth: {
      "default": 1200,
      "min": 600,
      "max": 2000
    },
    trackType: {
      "default": "ceiling",
      "options": [
        "ceiling",
        "floor",
        "both"
      ]
    }
  },

  inputs: {
        path: 'Wire'
  },

  outputs: {
        partition: 'Shape[]',
    track: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'movablePartition',
      params: {
        path: inputs.path,
        panelWidth: params.panelWidth,
        trackType: params.trackType
      }
    });

    return {
      partition: result,
      track: result
    };
  }
};
