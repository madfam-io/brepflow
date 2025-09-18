
import { NodeDefinition } from '@brepflow/types';

interface Params {
  continuity: string;
  mergeTolerance: number;
}
interface Inputs {
  curves: Wire[];
}
interface Outputs {
  composite: Wire;
}

export const CompositeCurveNode: NodeDefinition<CompositeCurveInputs, CompositeCurveOutputs, CompositeCurveParams> = {
  type: 'Surface::CompositeCurve',
  category: 'Surface',
  subcategory: 'Curves',

  metadata: {
    label: 'CompositeCurve',
    description: 'Create composite curve',
    
    
  },

  params: {
        continuity: {
      "default": "G1",
      "options": [
        "G0",
        "G1",
        "G2"
      ]
    },
    mergeTolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    }
  },

  inputs: {
        curves: 'Wire[]'
  },

  outputs: {
        composite: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'compositeCurve',
      params: {
        curves: inputs.curves,
        continuity: params.continuity,
        mergeTolerance: params.mergeTolerance
      }
    });

    return {
      composite: result
    };
  }
};
