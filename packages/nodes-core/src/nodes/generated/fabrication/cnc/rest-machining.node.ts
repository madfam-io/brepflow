
import { NodeDefinition } from '@brepflow/types';

interface Params {
  previousTool: number;
  currentTool: number;
}
interface Inputs {
  model: Shape;
  previousPaths: Wire[];
}
interface Outputs {
  restAreas: Face[];
  restPaths: Wire[];
}

export const RestMachiningNode: NodeDefinition<RestMachiningInputs, RestMachiningOutputs, RestMachiningParams> = {
  type: 'Fabrication::RestMachining',
  category: 'Fabrication',
  subcategory: 'CNC',

  metadata: {
    label: 'RestMachining',
    description: 'Rest material machining',
    
    
  },

  params: {
        previousTool: {
      "default": 10,
      "min": 1,
      "max": 50
    },
    currentTool: {
      "default": 3,
      "min": 0.1,
      "max": 50
    }
  },

  inputs: {
        model: 'Shape',
    previousPaths: 'Wire[]'
  },

  outputs: {
        restAreas: 'Face[]',
    restPaths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'restMachining',
      params: {
        model: inputs.model,
        previousPaths: inputs.previousPaths,
        previousTool: params.previousTool,
        currentTool: params.currentTool
      }
    });

    return {
      restAreas: result,
      restPaths: result
    };
  }
};
