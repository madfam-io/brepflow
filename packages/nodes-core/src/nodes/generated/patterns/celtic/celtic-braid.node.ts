
import { NodeDefinition } from '@brepflow/types';

interface Params {
  strands: number;
  crossings: number;
}
interface Inputs {
  centerline: Wire;
}
interface Outputs {
  braid: Wire[];
}

export const CelticBraidNode: NodeDefinition<CelticBraidInputs, CelticBraidOutputs, CelticBraidParams> = {
  type: 'Patterns::CelticBraid',
  category: 'Patterns',
  subcategory: 'Celtic',

  metadata: {
    label: 'CelticBraid',
    description: 'Celtic braid pattern',
    
    
  },

  params: {
        strands: {
      "default": 3,
      "min": 2,
      "max": 8,
      "step": 1
    },
    crossings: {
      "default": 5,
      "min": 1,
      "max": 20,
      "step": 1
    }
  },

  inputs: {
        centerline: 'Wire'
  },

  outputs: {
        braid: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'celticBraid',
      params: {
        centerline: inputs.centerline,
        strands: params.strands,
        crossings: params.crossings
      }
    });

    return {
      braid: result
    };
  }
};
