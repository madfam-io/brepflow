
import { NodeDefinition } from '@brepflow/types';

interface Params {
  degree: number;
  tolerance: number;
  smoothness: number;
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  curve: Wire;
}

export const ApproximateCurveNode: NodeDefinition<ApproximateCurveInputs, ApproximateCurveOutputs, ApproximateCurveParams> = {
  type: 'Surface::ApproximateCurve',
  category: 'Surface',
  subcategory: 'Curves',

  metadata: {
    label: 'ApproximateCurve',
    description: 'Approximate points with curve',
    
    
  },

  params: {
        degree: {
      "default": 3,
      "min": 1,
      "max": 10
    },
    tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    },
    smoothness: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        points: 'Point[]'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'approximateCurve',
      params: {
        points: inputs.points,
        degree: params.degree,
        tolerance: params.tolerance,
        smoothness: params.smoothness
      }
    });

    return {
      curve: result
    };
  }
};
