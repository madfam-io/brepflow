
import { NodeDefinition } from '@brepflow/types';

interface Params {
  offset: number;
  flipDirection: boolean;
}
interface Inputs {
  targetBody: Shape;
  toolBody: Shape;
}
interface Outputs {
  indented: Shape;
}

export const IndentNode: NodeDefinition<IndentInputs, IndentOutputs, IndentParams> = {
  type: 'Advanced::Indent',
  category: 'Advanced',
  subcategory: 'Features',

  metadata: {
    label: 'Indent',
    description: 'Create indent from tool body',
    
    
  },

  params: {
        offset: {
      "default": 0.5,
      "min": 0,
      "max": 100
    },
    flipDirection: {
      "default": false
    }
  },

  inputs: {
        targetBody: 'Shape',
    toolBody: 'Shape'
  },

  outputs: {
        indented: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'indent',
      params: {
        targetBody: inputs.targetBody,
        toolBody: inputs.toolBody,
        offset: params.offset,
        flipDirection: params.flipDirection
      }
    });

    return {
      indented: result
    };
  }
};
