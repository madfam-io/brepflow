
import { NodeDefinition } from '@brepflow/types';

interface Params {
  sampleCount: number;
}
interface Inputs {
  surface1: Face;
  surface2: Face;
}
interface Outputs {
  maxDeviation: number;
  avgDeviation: number;
  deviationMap: Data;
}

export const SurfaceDeviationNode: NodeDefinition<SurfaceDeviationInputs, SurfaceDeviationOutputs, SurfaceDeviationParams> = {
  type: 'Surface::SurfaceDeviation',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'SurfaceDeviation',
    description: 'Measure surface deviation',
    
    
  },

  params: {
        sampleCount: {
      "default": 1000,
      "min": 100,
      "max": 10000,
      "step": 100
    }
  },

  inputs: {
        surface1: 'Face',
    surface2: 'Face'
  },

  outputs: {
        maxDeviation: 'number',
    avgDeviation: 'number',
    deviationMap: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceDeviation',
      params: {
        surface1: inputs.surface1,
        surface2: inputs.surface2,
        sampleCount: params.sampleCount
      }
    });

    return {
      maxDeviation: result,
      avgDeviation: result,
      deviationMap: result
    };
  }
};
