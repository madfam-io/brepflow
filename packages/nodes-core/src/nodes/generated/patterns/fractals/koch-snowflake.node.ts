
import { NodeDefinition } from '@brepflow/types';

interface Params {
  iterations: number;
}
interface Inputs {
  triangle: Wire;
}
interface Outputs {
  fractal: Wire;
}

export const KochSnowflakeNode: NodeDefinition<KochSnowflakeInputs, KochSnowflakeOutputs, KochSnowflakeParams> = {
  type: 'Patterns::KochSnowflake',
  category: 'Patterns',
  subcategory: 'Fractals',

  metadata: {
    label: 'KochSnowflake',
    description: 'Koch snowflake fractal',
    
    
  },

  params: {
        iterations: {
      "default": 4,
      "min": 0,
      "max": 8,
      "step": 1
    }
  },

  inputs: {
        triangle: 'Wire'
  },

  outputs: {
        fractal: 'Wire'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'kochSnowflake',
      params: {
        triangle: inputs.triangle,
        iterations: params.iterations
      }
    });

    return {
      fractal: result
    };
  }
};
