
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
}
interface Inputs {
  assembly: Assembly;
}
interface Outputs {
  envelope: Shape;
}

export const EnvelopeNode: NodeDefinition<EnvelopeInputs, EnvelopeOutputs, EnvelopeParams> = {
  type: 'Assembly::Envelope',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'Envelope',
    description: 'Create assembly envelope',
    
    
  },

  params: {
        type: {
      "default": "bounding",
      "options": [
        "bounding",
        "swept",
        "motion"
      ]
    }
  },

  inputs: {
        assembly: 'Assembly'
  },

  outputs: {
        envelope: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyEnvelope',
      params: {
        assembly: inputs.assembly,
        type: params.type
      }
    });

    return {
      envelope: result
    };
  }
};
