
import { NodeDefinition } from '@brepflow/types';

interface Params {
  order: number;
}
interface Inputs {
  bounds: Box;
}
interface Outputs {
  curve: Wire;
}

export const PeanoCurveNode: NodeDefinition<PeanoCurveInputs, PeanoCurveOutputs, PeanoCurveParams> = {
  type: 'Patterns::PeanoCurve',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'PeanoCurve',
    description: 'Peano space-filling curve',
    
    
  },

  params: {
        order: {
      "default": 3,
      "min": 1,
      "max": 6,
      "step": 1
    }
  },

  inputs: {
        bounds: 'Box'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'peanoCurve',
      params: {
        bounds: inputs.bounds,
        order: params.order
      }
    });

    return {
      curve: result
    };
  }
};
