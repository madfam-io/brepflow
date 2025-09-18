
import { NodeDefinition } from '@brepflow/types';

interface Params {
  raftLayers: number;
  raftOffset: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  raft: Shape;
}

export const RaftGenerationNode: NodeDefinition<RaftGenerationInputs, RaftGenerationOutputs, RaftGenerationParams> = {
  type: 'Fabrication::RaftGeneration',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'RaftGeneration',
    description: 'Generate raft for adhesion',
    
    
  },

  params: {
        raftLayers: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    raftOffset: {
      "default": 5,
      "min": 0,
      "max": 20
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        raft: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'raftGeneration',
      params: {
        model: inputs.model,
        raftLayers: params.raftLayers,
        raftOffset: params.raftOffset
      }
    });

    return {
      raft: result
    };
  }
};
