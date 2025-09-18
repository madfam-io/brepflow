
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
    
    // TODO: Implement RectangularPattern logic
    throw new Error('RectangularPattern not yet implemented');
  }
};
