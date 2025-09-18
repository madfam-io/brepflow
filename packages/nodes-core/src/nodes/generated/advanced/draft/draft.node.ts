
import { NodeDefinition } from '@brepflow/types';

interface Params {
  angle: number;
  pullDirection: [number, number, number];
  neutralPlane: [number, number, number];
}
interface Inputs {
  solid: Shape;
  facesToDraft: Face[];
}
interface Outputs {
  drafted: Shape;
}

export const DraftNode: NodeDefinition<DraftInputs, DraftOutputs, DraftParams> = {
  type: 'Advanced::Draft',
  category: 'Advanced',
  subcategory: 'Draft',

  metadata: {
    label: 'Draft',
    description: 'Add draft angle to faces',
    
    
  },

  params: {
        angle: {
      "default": 3,
      "min": -30,
      "max": 30,
      "description": "Draft angle in degrees"
    },
    pullDirection: {
      "default": [
        0,
        0,
        1
      ]
    },
    neutralPlane: {
      "default": [
        0,
        0,
        0
      ]
    }
  },

  inputs: {
        solid: 'Shape',
    facesToDraft: 'Face[]'
  },

  outputs: {
        drafted: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'draft',
      params: {
        solid: inputs.solid,
        facesToDraft: inputs.facesToDraft,
        angle: params.angle,
        pullDirection: params.pullDirection,
        neutralPlane: params.neutralPlane
      }
    });

    return {
      drafted: result
    };
  }
};
