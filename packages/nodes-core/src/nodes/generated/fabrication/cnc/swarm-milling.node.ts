
import { NodeDefinition } from '@brepflow/types';

interface Params {
  passCount: number;
  overlap: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  swarmPaths: Wire[];
}

export const SwarmMillingNode: NodeDefinition<SwarmMillingInputs, SwarmMillingOutputs, SwarmMillingParams> = {
  type: 'Fabrication::SwarmMilling',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'SwarmMilling',
    description: 'Swarm/parallel finishing',
    
    
  },

  params: {
        passCount: {
      "default": 5,
      "min": 1,
      "max": 20,
      "step": 1
    },
    overlap: {
      "default": 0.1,
      "min": 0,
      "max": 0.5
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        swarmPaths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'swarmMilling',
      params: {
        surface: inputs.surface,
        passCount: params.passCount,
        overlap: params.overlap
      }
    });

    return {
      swarmPaths: result
    };
  }
};
