
import { NodeDefinition } from '@brepflow/types';

interface Params {
  axis: [number, number, number];
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  conicalSlices: Wire[];
}

export const ConicalSlicingNode: NodeDefinition<ConicalSlicingInputs, ConicalSlicingOutputs, ConicalSlicingParams> = {
  type: 'Fabrication::ConicalSlicing',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'ConicalSlicing',
    description: 'Conical/cylindrical slicing',
    
    
  },

  params: {
        axis: {
      "default": "[0, 0, 1]"
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        conicalSlices: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'conicalSlicing',
      params: {
        model: inputs.model,
        axis: params.axis
      }
    });

    return {
      conicalSlices: result
    };
  }
};
