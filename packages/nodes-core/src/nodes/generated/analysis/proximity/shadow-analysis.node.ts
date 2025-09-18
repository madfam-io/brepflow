
import { NodeDefinition } from '@brepflow/types';

interface Params {
  lightType: string;
  intensity: number;
}
interface Inputs {
  lightSource: Point;
  lightDirection?: Vector;
  objects: Shape[];
  groundPlane: Face;
}
interface Outputs {
  shadowRegions: Face[];
  lightRays: Wire[];
  illuminatedAreas: Face[];
}

export const ShadowAnalysisNode: NodeDefinition<ShadowAnalysisInputs, ShadowAnalysisOutputs, ShadowAnalysisParams> = {
  type: 'Analysis::ShadowAnalysis',
  category: 'Analysis',
  subcategory: 'Proximity',

  metadata: {
    label: 'ShadowAnalysis',
    description: 'Calculate shadow patterns',
    
    
  },

  params: {
        lightType: {
      "default": "directional",
      "options": [
        "directional",
        "point",
        "spot"
      ]
    },
    intensity: {
      "default": 1,
      "min": 0.1,
      "max": 10
    }
  },

  inputs: {
        lightSource: 'Point',
    lightDirection: 'Vector',
    objects: 'Shape[]',
    groundPlane: 'Face'
  },

  outputs: {
        shadowRegions: 'Face[]',
    lightRays: 'Wire[]',
    illuminatedAreas: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'shadowAnalysis',
      params: {
        lightSource: inputs.lightSource,
        lightDirection: inputs.lightDirection,
        objects: inputs.objects,
        groundPlane: inputs.groundPlane,
        lightType: params.lightType,
        intensity: params.intensity
      }
    });

    return {
      shadowRegions: result,
      lightRays: result,
      illuminatedAreas: result
    };
  }
};
