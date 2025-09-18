
import { NodeDefinition } from '@brepflow/types';

interface Params {
  leadLength: number;
  leadType: string;
}
interface Inputs {
  paths: Wire[];
}
interface Outputs {
  pathsWithLeads: Wire[];
}

export const LeadInOutNode: NodeDefinition<LeadInOutInputs, LeadInOutOutputs, LeadInOutParams> = {
  type: 'Fabrication::LeadInOut',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'LeadInOut',
    description: 'Add lead-in/out to paths',
    
    
  },

  params: {
        leadLength: {
      "default": 2,
      "min": 0.5,
      "max": 10
    },
    leadType: {
      "default": "line",
      "options": [
        "line",
        "arc",
        "none"
      ]
    }
  },

  inputs: {
        paths: 'Wire[]'
  },

  outputs: {
        pathsWithLeads: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'leadInOut',
      params: {
        paths: inputs.paths,
        leadLength: params.leadLength,
        leadType: params.leadType
      }
    });

    return {
      pathsWithLeads: result
    };
  }
};
