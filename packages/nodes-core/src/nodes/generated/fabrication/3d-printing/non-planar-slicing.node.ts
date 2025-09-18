
import { NodeDefinition } from '@brepflow/types';

interface Params {
  maxAngle: number;
}
interface Inputs {
  model: Shape;
}
interface Outputs {
  nonPlanarSlices: Wire[];
}

export const NonPlanarSlicingNode: NodeDefinition<NonPlanarSlicingInputs, NonPlanarSlicingOutputs, NonPlanarSlicingParams> = {
  type: 'Fabrication::NonPlanarSlicing',
  category: 'Fabrication',
  subcategory: '3D Printing',

  metadata: {
    label: 'NonPlanarSlicing',
    description: 'Non-planar slicing paths',
    
    
  },

  params: {
        maxAngle: {
      "default": 30,
      "min": 0,
      "max": 60
    }
  },

  inputs: {
        model: 'Shape'
  },

  outputs: {
        nonPlanarSlices: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'nonPlanarSlicing',
      params: {
        model: inputs.model,
        maxAngle: params.maxAngle
      }
    });

    return {
      nonPlanarSlices: result
    };
  }
};
