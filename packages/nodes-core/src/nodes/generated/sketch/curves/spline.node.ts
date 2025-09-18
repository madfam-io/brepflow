
import { NodeDefinition } from '@brepflow/types';

interface Params {
  degree: number;
  closed: boolean;
  smooth: boolean;
}
interface Inputs {
  points: Point[];
  tangents?: Vector[];
}
interface Outputs {
  curve: Wire;
}

export const SplineNode: NodeDefinition<SplineInputs, SplineOutputs, SplineParams> = {
  type: 'Sketch::Spline',
  category: 'Sketch',
  subcategory: 'Curves',

  metadata: {
    label: 'Spline',
    description: 'Create a spline curve through points',
    
    
  },

  params: {
        degree: {
      "default": 3,
      "min": 1,
      "max": 10,
      "description": "Spline degree"
    },
    closed: {
      "default": false,
      "description": "Close the spline"
    },
    smooth: {
      "default": true,
      "description": "Smooth tangents"
    }
  },

  inputs: {
        points: 'Point[]',
    tangents: 'Vector[]'
  },

  outputs: {
        curve: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'makeSpline',
      params: {
        points: inputs.points,
        tangents: inputs.tangents,
        degree: params.degree,
        closed: params.closed,
        smooth: params.smooth
      }
    });

    return {
      curve: result
    };
  }
};
