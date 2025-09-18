
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

export const IntersectionNode: NodeDefinition<IntersectionInputs, IntersectionOutputs, IntersectionParams> = {
  type: 'Boolean::Intersection',
  category: 'Boolean',
  

  metadata: {
    label: 'Intersection',
    description: 'Keep only overlapping regions',
    
    
  },

  params: {
        keepOriginals: {
      "default": false
    },
    fuzzyValue: {
      "default": 1e-7,
      "min": 0,
      "max": 1
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
      type: 'booleanIntersection',
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
