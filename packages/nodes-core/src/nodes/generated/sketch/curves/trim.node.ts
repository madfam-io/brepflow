
import { NodeDefinition } from '@brepflow/types';

interface Params {
  startParameter: number;
  endParameter: number;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  trimmed: Wire;
}

export const TrimNode: NodeDefinition<TrimInputs, TrimOutputs, TrimParams> = {
  type: 'Sketch::Trim',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Trim',
    description: 'Trim a curve',
    
    
  },

  params: {
        startParameter: {
      "default": 0,
      "min": 0,
      "max": 1
    },
    endParameter: {
      "default": 1,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        trimmed: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'trimCurve',
      params: {
        curve: inputs.curve,
        startParameter: params.startParameter,
        endParameter: params.endParameter
      }
    });

    return {
      trimmed: result
    };
  }
};
