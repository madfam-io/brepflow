
import { NodeDefinition } from '@brepflow/types';

interface Params {
  irregularity: number;
  density: number;
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  fragments: Face[];
}

export const VoronoiFractureNode: NodeDefinition<VoronoiFractureInputs, VoronoiFractureOutputs, VoronoiFractureParams> = {
  type: 'Patterns::VoronoiFracture',
  category: 'Patterns',
  subcategory: 'Voronoi',

  metadata: {
    label: 'VoronoiFracture',
    description: 'Fracture pattern generation',
    
    
  },

  params: {
        irregularity: {
      "default": 0.5,
      "min": 0,
      "max": 1
    },
    density: {
      "default": 10,
      "min": 1,
      "max": 100
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        fragments: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'voronoiFracture',
      params: {
        surface: inputs.surface,
        irregularity: params.irregularity,
        density: params.density
      }
    });

    return {
      fragments: result
    };
  }
};
