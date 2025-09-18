
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sampleDensity: number;
  analysisType: string;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  roughnessRa: number;
  roughnessRz: number;
  roughnessRq: number;
  roughnessMap: Shape;
}

export const SurfaceRoughnessNode: NodeDefinition<SurfaceRoughnessInputs, SurfaceRoughnessOutputs, SurfaceRoughnessParams> = {
  type: 'Analysis::SurfaceRoughness',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceRoughness',
    description: 'Calculate surface roughness metrics',
    
    
  },

  params: {
        sampleDensity: {
      "default": 50,
      "min": 10,
      "max": 200
    },
    analysisType: {
      "default": "all",
      "options": [
        "Ra",
        "Rz",
        "Rq",
        "all"
      ]
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        roughnessRa: 'number',
    roughnessRz: 'number',
    roughnessRq: 'number',
    roughnessMap: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceRoughness',
      params: {
        surface: inputs.surface,
        sampleDensity: params.sampleDensity,
        analysisType: params.analysisType
      }
    });

    return {
      roughnessRa: result,
      roughnessRz: result,
      roughnessRq: result,
      roughnessMap: result
    };
  }
};
