
import { NodeDefinition } from '@brepflow/types';

interface Params {
  degree: number;
  periodic: boolean;
}
interface Inputs {
  controlPoints: Point[];
  weights?: number[];
  knots?: number[];
}
interface Outputs {
  curve: Wire;
}

export const NurbsCurveNode: NodeDefinition<NurbsCurveInputs, NurbsCurveOutputs, NurbsCurveParams> = {
  type: 'Surface::NurbsCurve',
  category: 'Surface',
  subcategory: 'Curves',

  metadata: {
    label: 'NurbsCurve',
    description: 'Create NURBS curve',
    
    
  },

  params: {
        degree: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    periodic: {
      "default": false
    }
  },

  inputs: {
        controlPoints: 'Point[]',
    weights: 'number[]',
    knots: 'number[]'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'nurbsCurve',
      params: {
        controlPoints: inputs.controlPoints,
        weights: inputs.weights,
        knots: inputs.knots,
        degree: params.degree,
        periodic: params.periodic
      }
    });

    return {
      curve: result
    };
  }
};
