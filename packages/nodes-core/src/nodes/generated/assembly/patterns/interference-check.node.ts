
import { NodeDefinition } from '@brepflow/types';

interface Params {
  clearance: number;
}
interface Inputs {
  assembly: Assembly;
}
interface Outputs {
  interferences: Interference[];
  hasInterference: boolean;
}

export const InterferenceCheckNode: NodeDefinition<InterferenceCheckInputs, InterferenceCheckOutputs, InterferenceCheckParams> = {
  type: 'Assembly::InterferenceCheck',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'InterferenceCheck',
    description: 'Check for interferences',
    
    
  },

  params: {
        clearance: {
      "default": 0,
      "min": 0,
      "max": 100
    }
  },

  inputs: {
        assembly: 'Assembly'
  },

  outputs: {
        interferences: 'Interference[]',
    hasInterference: 'boolean'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyInterference',
      params: {
        assembly: inputs.assembly,
        clearance: params.clearance
      }
    });

    return {
      interferences: result,
      hasInterference: result
    };
  }
};
