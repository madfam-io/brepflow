
import { NodeDefinition } from '@brepflow/types';

interface Params {
  type: string;
  friction: number;
}
interface Inputs {
  faces1: Face[];
  faces2: Face[];
}
interface Outputs {
  contactSet: ContactSet;
}

export const ContactSetNode: NodeDefinition<ContactSetInputs, ContactSetOutputs, ContactSetParams> = {
  type: 'Assembly::ContactSet',
  category: 'Assembly',
  subcategory: 'Patterns',

  metadata: {
    label: 'ContactSet',
    description: 'Define contact sets',
    
    
  },

  params: {
        type: {
      "default": "no_penetration",
      "options": [
        "bonded",
        "no_penetration",
        "frictionless"
      ]
    },
    friction: {
      "default": 0.3,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        faces1: 'Face[]',
    faces2: 'Face[]'
  },

  outputs: {
        contactSet: 'ContactSet'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'assemblyContactSet',
      params: {
        faces1: inputs.faces1,
        faces2: inputs.faces2,
        type: params.type,
        friction: params.friction
      }
    });

    return {
      contactSet: result
    };
  }
};
