
import { NodeDefinition } from '@brepflow/types';

interface Params {
  samples: number;
  colorMap: boolean;
  tolerance: number;
}
interface Inputs {
  testSurface: Face;
  referenceSurface: Face;
}
interface Outputs {
  deviationMap: Shape;
  maxDeviation: number;
  averageDeviation: number;
  deviationPoints: Point[];
}

export const SurfaceDeviationNode: NodeDefinition<SurfaceDeviationInputs, SurfaceDeviationOutputs, SurfaceDeviationParams> = {
  type: 'Analysis::SurfaceDeviation',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceDeviation',
    description: 'Compare surface deviation from reference',
    
    
  },

  params: {
        samples: {
      "default": 100,
      "min": 20,
      "max": 500
    },
    colorMap: {
      "default": true
    },
    tolerance: {
      "default": 0.1,
      "min": 0.001,
      "max": 10
    }
  },

  inputs: {
        testSurface: 'Face',
    referenceSurface: 'Face'
  },

  outputs: {
        deviationMap: 'Shape',
    maxDeviation: 'number',
    averageDeviation: 'number',
    deviationPoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceDeviation',
      params: {
        testSurface: inputs.testSurface,
        referenceSurface: inputs.referenceSurface,
        samples: params.samples,
        colorMap: params.colorMap,
        tolerance: params.tolerance
      }
    });

    return {
      deviationMap: result,
      maxDeviation: result,
      averageDeviation: result,
      deviationPoints: result
    };
  }
};
