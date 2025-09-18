
import { NodeDefinition } from '@brepflow/types';

interface Params {
  slabThickness: number;
  tendonSpacing: number;
}
interface Inputs {
  slabOutline: Wire;
  columnPoints?: Point[];
}
interface Outputs {
  ptSlab: Shape;
  tendons: Wire[];
}

export const PostTensionedSlabNode: NodeDefinition<PostTensionedSlabInputs, PostTensionedSlabOutputs, PostTensionedSlabParams> = {
  type: 'Architecture::PostTensionedSlab',
  category: 'Architecture',
  subcategory: 'Floors',

  metadata: {
    label: 'PostTensionedSlab',
    description: 'Post-tensioned concrete slab',
    
    
  },

  params: {
        slabThickness: {
      "default": 200,
      "min": 150,
      "max": 400
    },
    tendonSpacing: {
      "default": 1200,
      "min": 900,
      "max": 1800
    }
  },

  inputs: {
        slabOutline: 'Wire',
    columnPoints: 'Point[]'
  },

  outputs: {
        ptSlab: 'Shape',
    tendons: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'postTensionedSlab',
      params: {
        slabOutline: inputs.slabOutline,
        columnPoints: inputs.columnPoints,
        slabThickness: params.slabThickness,
        tendonSpacing: params.tendonSpacing
      }
    });

    return {
      ptSlab: result,
      tendons: result
    };
  }
};
