
import { NodeDefinition } from '@brepflow/types';

interface Params {
  keepAll: boolean;
}
interface Inputs {
  shapes: Shape[];
  tools: Shape[];
}
interface Outputs {
  fragments: Shape[];
}

export const SplitNode: NodeDefinition<SplitInputs, SplitOutputs, SplitParams> = {
  type: 'Boolean::Split',
  category: 'Boolean',
  

  metadata: {
    label: 'Split',
    description: 'Split shapes by each other',
    
    
  },

  params: {
        keepAll: {
      "default": true,
      "description": "Keep all fragments"
    }
  },

  inputs: {
        shapes: 'Shape[]',
    tools: 'Shape[]'
  },

  outputs: {
        fragments: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'booleanSplit',
      params: {
        shapes: inputs.shapes,
        tools: inputs.tools,
        keepAll: params.keepAll
      }
    });

    return {
      fragments: result
    };
  }
};
