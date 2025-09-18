
import { NodeDefinition } from '@brepflow/types';

interface Params {
  keepRegion: string;
  projectCurves: boolean;
}
interface Inputs {
  surface: Face;
  trimmingCurves: Wire[];
}
interface Outputs {
  trimmedSurface: Face;
}

export const TrimSurfaceNode: NodeDefinition<TrimSurfaceInputs, TrimSurfaceOutputs, TrimSurfaceParams> = {
  type: 'Advanced::TrimSurface',
  category: 'Advanced',
  subcategory: 'Surface',

  metadata: {
    label: 'TrimSurface',
    description: 'Trim surface with curves',
    
    
  },

  params: {
        keepRegion: {
      "default": "inside",
      "options": [
        "inside",
        "outside"
      ]
    },
    projectCurves: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face',
    trimmingCurves: 'Wire[]'
  },

  outputs: {
        trimmedSurface: 'Face'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'trimSurface',
      params: {
        surface: inputs.surface,
        trimmingCurves: inputs.trimmingCurves,
        keepRegion: params.keepRegion,
        projectCurves: params.projectCurves
      }
    });

    return {
      trimmedSurface: result
    };
  }
};
