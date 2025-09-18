
import { NodeDefinition } from '@brepflow/types';

interface Params {
  uCount: number;
  vCount: number;
  direction: string;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  uCurves: Wire[];
  vCurves: Wire[];
  allCurves: Wire[];
}

export const SurfaceIsoCurvesNode: NodeDefinition<SurfaceIsoCurvesInputs, SurfaceIsoCurvesOutputs, SurfaceIsoCurvesParams> = {
  type: 'Analysis::SurfaceIsoCurves',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceIsoCurves',
    description: 'Extract surface isocurves',
    
    
  },

  params: {
        uCount: {
      "default": 10,
      "min": 2,
      "max": 50
    },
    vCount: {
      "default": 10,
      "min": 2,
      "max": 50
    },
    direction: {
      "default": "both",
      "options": [
        "both",
        "u-only",
        "v-only"
      ]
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        uCurves: 'Wire[]',
    vCurves: 'Wire[]',
    allCurves: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceIsocurves',
      params: {
        surface: inputs.surface,
        uCount: params.uCount,
        vCount: params.vCount,
        direction: params.direction
      }
    });

    return {
      uCurves: result,
      vCurves: result,
      allCurves: result
    };
  }
};
