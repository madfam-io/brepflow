
import { NodeDefinition } from '@brepflow/types';

interface Params {
  degree: number;
  periodic: boolean;
  tangentStart: [number, number, number];
  tangentEnd: [number, number, number];
}
interface Inputs {
  points: Point[];
}
interface Outputs {
  curve: Wire;
}

export const InterpolateCurveNode: NodeDefinition<InterpolateCurveInputs, InterpolateCurveOutputs, InterpolateCurveParams> = {
  type: 'Surface::InterpolateCurve',
  category: 'Surface',
  subcategory: 'Curves',

  metadata: {
    label: 'InterpolateCurve',
    description: 'Interpolate curve through points',
    
    
  },

  params: {
        degree: {
      "default": 3,
      "min": 1,
      "max": 10
    },
    periodic: {
      "default": false
    },
    tangentStart: {
      "default": null
    },
    tangentEnd: {
      "default": null
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
      type: 'interpolateCurve',
      params: {
        points: inputs.points,
        degree: params.degree,
        periodic: params.periodic,
        tangentStart: params.tangentStart,
        tangentEnd: params.tangentEnd
      }
    });

    return {
      curve: result
    };
  }
};
