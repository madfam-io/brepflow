
import { NodeDefinition } from '@brepflow/types';

interface Params {
  showGrid: boolean;
  gridDensity: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  uRange: number[];
  vRange: number[];
  parameterGrid: Wire[];
}

export const SurfaceParametrizationNode: NodeDefinition<SurfaceParametrizationInputs, SurfaceParametrizationOutputs, SurfaceParametrizationParams> = {
  type: 'Analysis::SurfaceParametrization',
  category: 'Analysis',
  subcategory: 'Surfaces',

  metadata: {
    label: 'SurfaceParametrization',
    description: 'Analyze surface parametrization',
    
    
  },

  params: {
        showGrid: {
      "default": true
    },
    gridDensity: {
      "default": 20,
      "min": 5,
      "max": 100
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        uRange: 'number[]',
    vRange: 'number[]',
    parameterGrid: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'surfaceParametrization',
      params: {
        surface: inputs.surface,
        showGrid: params.showGrid,
        gridDensity: params.gridDensity
      }
    });

    return {
      uRange: result,
      vRange: result,
      parameterGrid: result
    };
  }
};
