
import { NodeDefinition } from '@brepflow/types';

interface Params {
  grammar: string;
  iterations: number;
  seed: string;
}
interface Inputs {
  shapeA: Shape;
  shapeB?: Shape;
}
interface Outputs {
  result: Shape[];
}

export const GrammarShapesNode: NodeDefinition<GrammarShapesInputs, GrammarShapesOutputs, GrammarShapesParams> = {
  type: 'Patterns::GrammarShapes',
  category: 'Patterns',
  subcategory: 'Procedural',

  metadata: {
    label: 'GrammarShapes',
    description: 'Shape grammar generation',
    
    
  },

  params: {
        grammar: {
      "default": "A->AB,B->A"
    },
    iterations: {
      "default": 5,
      "min": 1,
      "max": 10,
      "step": 1
    },
    seed: {
      "default": "A"
    }
  },

  inputs: {
        shapeA: 'Shape',
    shapeB: 'Shape'
  },

  outputs: {
        result: 'Shape[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'grammarShapes',
      params: {
        shapeA: inputs.shapeA,
        shapeB: inputs.shapeB,
        grammar: params.grammar,
        iterations: params.iterations,
        seed: params.seed
      }
    });

    return {
      result: result
    };
  }
};
