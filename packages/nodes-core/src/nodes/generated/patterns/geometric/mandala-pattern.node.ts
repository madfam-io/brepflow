
import { NodeDefinition } from '@brepflow/types';

interface Params {
  rings: number;
  symmetry: number;
  complexity: number;
}
interface Inputs {
  center: Point;
}
interface Outputs {
  mandala: Wire[];
}

export const MandalaPatternNode: NodeDefinition<MandalaPatternInputs, MandalaPatternOutputs, MandalaPatternParams> = {
  type: 'Patterns::MandalaPattern',
  category: 'Patterns',
  subcategory: 'Geometric',

  metadata: {
    label: 'MandalaPattern',
    description: 'Mandala circular pattern',
    
    
  },

  params: {
        rings: {
      "default": 5,
      "min": 1,
      "max": 20,
      "step": 1
    },
    symmetry: {
      "default": 8,
      "min": 3,
      "max": 24,
      "step": 1
    },
    complexity: {
      "default": 3,
      "min": 1,
      "max": 5
    }
  },

  inputs: {
        center: 'Point'
  },

  outputs: {
        mandala: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'mandalaPattern',
      params: {
        center: inputs.center,
        rings: params.rings,
        symmetry: params.symmetry,
        complexity: params.complexity
      }
    });

    return {
      mandala: result
    };
  }
};
