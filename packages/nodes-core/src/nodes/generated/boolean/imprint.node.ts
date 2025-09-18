
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
}
interface Inputs {
  base: Shape;
  imprint: Shape;
}
interface Outputs {
  result: Shape;
}

export const ImprintNode: NodeDefinition<ImprintInputs, ImprintOutputs, ImprintParams> = {
  type: 'Boolean::Imprint',
  category: 'Boolean',
  

  metadata: {
    label: 'Imprint',
    description: 'Imprint one shape onto another',
    
    
  },

  params: {
        depth: {
      "default": 1,
      "min": 0.01,
      "max": 1000,
      "description": "Imprint depth"
    }
  },

  inputs: {
        base: 'Shape',
    imprint: 'Shape'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'booleanImprint',
      params: {
        base: inputs.base,
        imprint: inputs.imprint,
        depth: params.depth
      }
    });

    return {
      result: result
    };
  }
};
