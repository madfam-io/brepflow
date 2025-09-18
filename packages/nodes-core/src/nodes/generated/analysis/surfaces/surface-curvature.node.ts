
import { NodeDefinition } from '@brepflow/types';

interface Params {
  uSamples: number;
  vSamples: number;
  curvatureType: string;
  colorMap: boolean;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  curvatureMap: Shape;
  maxCurvature: number;
  minCurvature: number;
  averageCurvature: number;
}

export const SurfaceCurvatureNode: NodeDefinition<SurfaceCurvatureInputs, SurfaceCurvatureOutputs, SurfaceCurvatureParams> = {
  type: 'Analysis::SurfaceCurvature',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceCurvature',
    description: 'Analyze surface curvature (Gaussian and Mean)',
    
    
  },

  params: {
        uSamples: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    vSamples: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    curvatureType: {
      "default": "gaussian",
      "options": [
        "gaussian",
        "mean",
        "principal"
      ]
    },
    colorMap: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        curvatureMap: 'Shape',
    maxCurvature: 'number',
    minCurvature: 'number',
    averageCurvature: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceCurvature',
      params: {
        surface: inputs.surface,
        uSamples: params.uSamples,
        vSamples: params.vSamples,
        curvatureType: params.curvatureType,
        colorMap: params.colorMap
      }
    });

    return {
      curvatureMap: result,
      maxCurvature: result,
      minCurvature: result,
      averageCurvature: result
    };
  }
};
