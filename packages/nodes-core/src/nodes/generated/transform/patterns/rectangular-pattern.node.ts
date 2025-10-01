
import { NodeDefinition } from '@brepflow/types';

interface Params {
  countX: number;
  countY: number;
  spacingX: number;
  spacingY: number;
  staggered: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  shapes: Shape[];
  compound: Shape;
}

export const RectangularPatternNode: NodeDefinition<RectangularPatternInputs, RectangularPatternOutputs, RectangularPatternParams> = {
  type: 'Transform::RectangularPattern',
  category: 'Transform',
  subcategory: 'Patterns',

  metadata: {
    label: 'RectangularPattern',
    description: 'Creates a 2D rectangular grid pattern',
    
    tags: ["pattern","array","grid","rectangular"],
  },

  params: {
        countX: {
      "default": 4,
      "min": 1,
      "max": 100
    },
    countY: {
      "default": 3,
      "min": 1,
      "max": 100
    },
    spacingX: {
      "default": 20,
      "min": 0.1,
      "max": 10000
    },
    spacingY: {
      "default": 20,
      "min": 0.1,
      "max": 10000
    },
    staggered: {
      "default": false,
      "description": "Stagger alternate rows"
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        shapes: 'Shape[]',
    compound: 'Shape'
  },

  async evaluate(context, inputs, params) {
    const response = await context.geometry.execute({
      type: 'CREATE_RECTANGULAR_PATTERN',
      params: {
        shape: inputs.shape,
        countX: params.countX,
        countY: params.countY,
        spacingX: params.spacingX,
        spacingY: params.spacingY,
        staggered: params.staggered,
        keepOriginal: true
      }
    });

    const shapes = Array.isArray(response) ? response : response?.shapes ?? [];
    const compound = Array.isArray(response) ? null : response?.compound ?? null;

    return {
      shapes,
      compound
    };
  }
};
