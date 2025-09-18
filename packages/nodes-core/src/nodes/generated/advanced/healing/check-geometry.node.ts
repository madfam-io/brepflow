
import { NodeDefinition } from '@brepflow/types';

interface Params {
  checkLevel: string;
}
interface Inputs {
  shape: Shape;
}
interface Outputs {
  isValid: boolean;
  errors: Data;
}

export const CheckGeometryNode: NodeDefinition<CheckGeometryInputs, CheckGeometryOutputs, CheckGeometryParams> = {
  type: 'Advanced::CheckGeometry',
  category: 'Advanced',
  subcategory: 'Healing',

  metadata: {
    label: 'CheckGeometry',
    description: 'Validate geometry',
    
    
  },

  params: {
        checkLevel: {
      "default": "standard",
      "options": [
        "basic",
        "standard",
        "advanced"
      ]
    }
  },

  inputs: {
        shape: 'Shape'
  },

  outputs: {
        isValid: 'boolean',
    errors: 'Data'
  },

  async evaluate(context, inputs, params) {
    
    const result = await context.geometry.execute({
      type: 'checkGeometry',
      params: {
        shape: inputs.shape,
        checkLevel: params.checkLevel
      }
    });

    return {
      isValid: result,
      errors: result
    };
  }
};
