
import { NodeDefinition } from '@brepflow/types';

interface Params {
  keepOriginals: boolean;
  fuzzyValue: number;
}
interface Inputs {
  base: Shape;
  tools: Shape[];
}
interface Outputs {
  result: Shape;
}

export const DifferenceNode: NodeDefinition<DifferenceInputs, DifferenceOutputs, DifferenceParams> = {
  type: 'Boolean::Difference',
  category: 'Boolean',
  

  metadata: {
    label: 'Difference',
    description: 'Subtract tool shapes from base shape',
    
    
  },

  params: {
        keepOriginals: {
      "default": false
    },
    fuzzyValue: {
      "default": 1e-7,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        base: 'Shape',
    tools: 'Shape[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'booleanDifference',
      params: {
        base: inputs.base,
        tools: inputs.tools,
        keepOriginals: params.keepOriginals,
        fuzzyValue: params.fuzzyValue
      }
    });

    return {
      result: result
    };
  }
};
