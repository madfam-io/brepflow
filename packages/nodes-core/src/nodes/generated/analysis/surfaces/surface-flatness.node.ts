
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
  showBestFitPlane: boolean;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  isFlat: boolean;
  flatness: number;
  bestFitPlane: Face;
  maxDeviation: number;
}

export const SurfaceFlatnessNode: NodeDefinition<SurfaceFlatnessInputs, SurfaceFlatnessOutputs, SurfaceFlatnessParams> = {
  type: 'Analysis::SurfaceFlatness',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceFlatness',
    description: 'Analyze surface flatness',
    
    
  },

  params: {
        tolerance: {
      "default": 0.1,
      "min": 0.001,
      "max": 10
    },
    showBestFitPlane: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        isFlat: 'boolean',
    flatness: 'number',
    bestFitPlane: 'Face',
    maxDeviation: 'number'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceFlatness',
      params: {
        surface: inputs.surface,
        tolerance: params.tolerance,
        showBestFitPlane: params.showBestFitPlane
      }
    });

    return {
      isFlat: result,
      flatness: result,
      bestFitPlane: result,
      maxDeviation: result
    };
  }
};
