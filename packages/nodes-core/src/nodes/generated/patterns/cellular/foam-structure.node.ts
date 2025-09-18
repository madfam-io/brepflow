
import { NodeDefinition } from '@brepflow/types';

interface Params {
  bubbleCount: number;
  sizeVariation: number;
}
interface Inputs {
  container: Shape;
}
interface Outputs {
  foam: Face[];
}

export const FoamStructureNode: NodeDefinition<FoamStructureInputs, FoamStructureOutputs, FoamStructureParams> = {
  type: 'Patterns::FoamStructure',
  category: 'Patterns',
  subcategory: 'Cellular',

  metadata: {
    label: 'FoamStructure',
    description: 'Foam bubble structure',
    
    
  },

  params: {
        bubbleCount: {
      "default": 50,
      "min": 5,
      "max": 500,
      "step": 5
    },
    sizeVariation: {
      "default": 0.5,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        container: 'Shape'
  },

  outputs: {
        foam: 'Face[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'foamStructure',
      params: {
        container: inputs.container,
        bubbleCount: params.bubbleCount,
        sizeVariation: params.sizeVariation
      }
    });

    return {
      foam: result
    };
  }
};
