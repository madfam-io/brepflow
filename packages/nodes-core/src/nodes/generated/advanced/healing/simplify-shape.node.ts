
import { NodeDefinition } from '@brepflow/types';

interface Params {
  simplifyMethod: string;
  tolerance: number;
  preserveTopology: boolean;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  simplified: Shape;
}

export const SimplifyShapeNode: NodeDefinition<SimplifyShapeInputs, SimplifyShapeOutputs, SimplifyShapeParams> = {
  type: 'Advanced::SimplifyShape',
  category: 'Advanced',
  subcategory: 'Healing',

  metadata: {
    label: 'SimplifyShape',
    description: 'Simplify complex geometry',
    
    
  },

  params: {
        simplifyMethod: {
      "default": "merge-faces",
      "options": [
        "merge-faces",
        "remove-details",
        "defeaturing"
      ]
    },
    tolerance: {
      "default": 0.01,
      "min": 0.0001,
      "max": 1
    },
    preserveTopology: {
      "default": true
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        simplified: 'Shape'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'simplifyShape',
      params: {
        shape: inputs.shape,
        simplifyMethod: params.simplifyMethod,
        tolerance: params.tolerance,
        preserveTopology: params.preserveTopology
      }
    });

    return {
      simplified: result
    };
  }
};
