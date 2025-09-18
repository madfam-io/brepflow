
import { NodeDefinition } from '@brepflow/types';

interface Params {
  tolerance: number;
}
interface Inputs {
  shapes: Shape[];
}
interface Outputs {
  result: Shape;
}

export const GlueNode: NodeDefinition<GlueInputs, GlueOutputs, GlueParams> = {
  type: 'Boolean::Glue',
  category: 'Boolean',
  

  metadata: {
    label: 'Glue',
    description: 'Glue shapes together at common faces',
    
    
  },

  params: {
        tolerance: {
      "default": 1e-7,
      "min": 0,
      "max": 1
    }
  },

  inputs: {
        shapes: 'Shape[]'
  },

  outputs: {
        result: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'booleanGlue',
      params: {
        shapes: inputs.shapes,
        tolerance: params.tolerance
      }
    });

    return {
      result: result
    };
  }
};
