
import { NodeDefinition } from '@brepflow/types';

interface Params {
  samples: number;
}
interface Inputs {
  curve: Wire;
}
interface Outputs {
  convexHull: Wire;
  hullPoints: Point[];
}

export const CurveConvexHullNode: NodeDefinition<CurveConvexHullInputs, CurveConvexHullOutputs, CurveConvexHullParams> = {
  type: 'Analysis::CurveConvexHull',
  category: 'Analysis',
  subcategory: 'Curves',

  metadata: {
    label: 'CurveConvexHull',
    description: 'Generate convex hull of curve points',
    
    
  },

  params: {
        samples: {
      "default": 100,
      "min": 20,
      "max": 500
    }
  },

  inputs: {
        curve: 'Wire'
  },

  outputs: {
        convexHull: 'Wire',
    hullPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'curveConvexHull',
      params: {
        curve: inputs.curve,
        samples: params.samples
      }
    });

    return {
      convexHull: result,
      hullPoints: result
    };
  }
};
