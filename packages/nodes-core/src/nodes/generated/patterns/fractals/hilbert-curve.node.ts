
import { NodeDefinition } from '@brepflow/types';

interface Params {
  order: number;
  dimension: string;
}
interface Inputs {
  bounds: Box;
}
interface Outputs {
  curve: Wire;
}

export const HilbertCurveNode: NodeDefinition<HilbertCurveInputs, HilbertCurveOutputs, HilbertCurveParams> = {
  type: 'Patterns::HilbertCurve',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'HilbertCurve',
    description: 'Hilbert space-filling curve',
    
    
  },

  params: {
        order: {
      "default": 4,
      "min": 1,
      "max": 8,
      "step": 1
    },
    dimension: {
      "default": "2D",
      "options": [
        "2D",
        "3D"
      ]
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
      type: 'hilbertCurve',
      params: {
        bounds: inputs.bounds,
        order: params.order,
        dimension: params.dimension
      }
    });

    return {
      curve: result
    };
  }
};
