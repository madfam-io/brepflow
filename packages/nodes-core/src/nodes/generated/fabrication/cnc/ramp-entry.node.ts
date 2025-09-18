
import { NodeDefinition } from '@brepflow/types';

interface Params {
  rampAngle: number;
  rampLength: number;
}
interface Inputs {
  entryEdge: Edge;
  depth: Number;
}
interface Outputs {
  rampPath: Wire;
}

export const RampEntryNode: NodeDefinition<RampEntryInputs, RampEntryOutputs, RampEntryParams> = {
  type: 'Fabrication::RampEntry',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'RampEntry',
    description: 'Ramped plunge entry',
    
    
  },

  params: {
        rampAngle: {
      "default": 5,
      "min": 1,
      "max": 30
    },
    rampLength: {
      "default": 20,
      "min": 5,
      "max": 100
    }
  },

  inputs: {
        entryEdge: 'Edge',
    depth: 'Number'
  },

  outputs: {
        rampPath: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'rampEntry',
      params: {
        entryEdge: inputs.entryEdge,
        depth: inputs.depth,
        rampAngle: params.rampAngle,
        rampLength: params.rampLength
      }
    });

    return {
      rampPath: result
    };
  }
};
