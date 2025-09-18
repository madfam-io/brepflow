
import { NodeDefinition } from '@brepflow/types';

interface Params {
  keepOriginals: boolean;
  fuzzyValue: number;
}
interface Inputs {
  shapes: Shape[];
}
interface Outputs {
  result: Shape;
}

export const UnionNode: NodeDefinition<UnionInputs, UnionOutputs, UnionParams> = {
  type: 'Boolean::Union',
  category: 'Boolean',
  

  metadata: {
    label: 'Union',
    description: 'Combine multiple shapes into one',
    
    
  },

  params: {
        keepOriginals: {
      "default": false,
      "description": "Keep original shapes"
    },
    fuzzyValue: {
      "default": 1e-7,
      "min": 0,
      "max": 1,
      "description": "Tolerance for fuzzy boolean"
    }
  },

  inputs: {
        shapes: 'Shape[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'booleanUnion',
      params: {
        shapes: inputs.shapes,
        keepOriginals: params.keepOriginals,
        fuzzyValue: params.fuzzyValue
      }
    });

    return {
      result: result
    };
  }
};
