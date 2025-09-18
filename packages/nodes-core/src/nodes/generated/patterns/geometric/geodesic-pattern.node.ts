
import { NodeDefinition } from '@brepflow/types';

interface Params {
  frequency: number;
  class: string;
}
interface Inputs {
  sphere: Face;
}
interface Outputs {
  geodesic: Wire[];
}

export const GeodesicPatternNode: NodeDefinition<GeodesicPatternInputs, GeodesicPatternOutputs, GeodesicPatternParams> = {
  type: 'Patterns::GeodesicPattern',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'GeodesicPattern',
    description: 'Geodesic dome pattern',
    
    
  },

  params: {
        frequency: {
      "default": 3,
      "min": 1,
      "max": 10,
      "step": 1
    },
    class: {
      "default": "I",
      "options": [
        "I",
        "II",
        "III"
      ]
    }
  },

  inputs: {
        sphere: 'Face'
  },

  outputs: {
        geodesic: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'geodesicPattern',
      params: {
        sphere: inputs.sphere,
        frequency: params.frequency,
        class: params.class
      }
    });

    return {
      geodesic: result
    };
  }
};
