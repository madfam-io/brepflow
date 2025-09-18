
import { NodeDefinition } from '@brepflow/types';

interface Params {
  depth: number;
  passes: number;
}
interface Inputs {
  vectors: Wire[];
}
interface Outputs {
  engravePaths: Wire[];
}

export const VectorEngraveNode: NodeDefinition<VectorEngraveInputs, VectorEngraveOutputs, VectorEngraveParams> = {
  type: 'Fabrication::VectorEngrave',
  category: 'Fabrication',
  subcategory: 'Laser',

  metadata: {
    label: 'VectorEngrave',
    description: 'Vector engraving paths',
    
    
  },

  params: {
        depth: {
      "default": 0.5,
      "min": 0.1,
      "max": 5
    },
    passes: {
      "default": 1,
      "min": 1,
      "max": 10,
      "step": 1
    }
  },

  inputs: {
        vectors: 'Wire[]'
  },

  outputs: {
        engravePaths: 'Wire[]'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'vectorEngrave',
      params: {
        vectors: inputs.vectors,
        depth: params.depth,
        passes: params.passes
      }
    });

    return {
      engravePaths: result
    };
  }
};
