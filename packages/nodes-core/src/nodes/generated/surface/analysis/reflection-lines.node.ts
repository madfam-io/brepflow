
import { NodeDefinition } from '@brepflow/types';

interface Params {
  lineCount: number;
  viewDirection: [number, number, number];
}
interface Inputs {
  surface: Face;
}
interface Outputs {
  reflectionLines: Wire[];
}

export const ReflectionLinesNode: NodeDefinition<ReflectionLinesInputs, ReflectionLinesOutputs, ReflectionLinesParams> = {
  type: 'Surface::ReflectionLines',
  category: 'Surface',
  subcategory: 'Analysis',

  metadata: {
    label: 'ReflectionLines',
    description: 'Reflection line analysis',
    
    
  },

  params: {
        lineCount: {
      "default": 10,
      "min": 3,
      "max": 50,
      "step": 1
    },
    viewDirection: {
      "default": [
        0,
        0,
        1
      ]
    }
  },

  inputs: {
        surface: 'Face'
  },

  outputs: {
        reflectionLines: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'reflectionLines',
      params: {
        surface: inputs.surface,
        lineCount: params.lineCount,
        viewDirection: params.viewDirection
      }
    });

    return {
      reflectionLines: result
    };
  }
};
