
import { NodeDefinition } from '@brepflow/types';

interface Params {
  steps: number;
}
interface Inputs {
  solid: Shape;
  draftData: Data;
}
interface Outputs {
  drafted: Shape;
}

export const StepDraftNode: NodeDefinition<StepDraftInputs, StepDraftOutputs, StepDraftParams> = {
  type: 'Advanced::StepDraft',
  category: 'Advanced',
  subcategory: 'Draft',

  metadata: {
    label: 'StepDraft',
    description: 'Multi-step draft',
    
    
  },

  params: {
        steps: {
      "default": 2,
      "min": 1,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        solid: 'Shape',
    draftData: 'Data'
  },

  outputs: {
        drafted: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'stepDraft',
      params: {
        solid: inputs.solid,
        draftData: inputs.draftData,
        steps: params.steps
      }
    });

    return {
      drafted: result
    };
  }
};
