
import { NodeDefinition } from '@brepflow/types';

interface Params {
  density: number;
  vectorLength: number;
  showVectors: boolean;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  normalVectors: Vector[];
  normalLines: Wire[];
  samplePoints: Point[];
}

export const SurfaceNormalsNode: NodeDefinition<SurfaceNormalsInputs, SurfaceNormalsOutputs, SurfaceNormalsParams> = {
  type: 'Analysis::SurfaceNormals',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceNormals',
    description: 'Calculate surface normal vectors',
    
    
  },

  params: {
        density: {
      "default": 20,
      "min": 5,
      "max": 100
    },
    vectorLength: {
      "default": 5,
      "min": 1,
      "max": 50
    },
    showVectors: {
      "default": true
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        normalVectors: 'Vector[]',
    normalLines: 'Wire[]',
    samplePoints: 'Point[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceNormals',
      params: {
        surface: inputs.surface,
        density: params.density,
        vectorLength: params.vectorLength,
        showVectors: params.showVectors
      }
    });

    return {
      normalVectors: result,
      normalLines: result,
      samplePoints: result
    };
  }
};
